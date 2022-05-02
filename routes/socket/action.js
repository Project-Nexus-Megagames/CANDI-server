const { createAction, effectAction, deleteAction, editAction, controlOverride, deleteSubObject, editSubObject } = require('../../game/actions');
const { addArrayValue } = require('../../middleware/util/arrayCalls');
const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling
const { Action } = require('../../models/action');

module.exports = {
	name: 'action',
	async function(client, req) {
		logger.info(`${client.username} has made a ${req.action} request in the ${req.route} route!`);
		const { data } = req.data;
		const { type } = req.type;
		try {
			let response;
			switch(type) {
			case 'create': {
				// console.log(data);
				response = await createAction(data, client.username);

				response.type === 'success' ? client.emit('clearLocalStorage', 'newActionStateGW') : null ;
				break;
			}
			case 'comment': {
				// Expects data.id <<Action ref>>
				// Expects data.comment <<Comment object>> { body, commentor, type, status }
				// console.log(data);
				const action = await Action.findById(data.id);
				action ? response = await action.comment(data.comment) : response = ({ message : `Could not find Action for ${data.id}`, type: 'error' });
				response.type === 'success' ? client.emit('clearLocalStorage', 'NewCommentGW') : null ;
				break;
			}
			case 'result': {
				// Expects data.id <<Action ref>>
				// Expects data.result <<Result object>> { description, resolver, dice }
				// console.log(data);
				const action = await Action.findById(data.id);
				action ? response = await action.postResult(data.result) : response = ({ message : `Could not find Action for ${data.id} in 'result'`, type: 'error' });
				response.type === 'success' ? client.emit('clearLocalStorage', 'newResultStateGW') : null ;
				break;
			}
			case 'effect': {
				// Expects data.id <<Action ref>>
				// Expects data.effect <<Effect object>> { description, type, asset <<Asset ref>>, action <<Action ref>>, other }
				response = await effectAction(data, client.username);
				break;
			}
			case 'delete': {
				response = await deleteAction(data, client.username);
				break;
			}
			case 'update': {
				// Expects data to be a Action object with edits
				response = await editAction(data, client.username);
				response.type === 'success' ? client.emit('clearLocalStorage', 'selectedActionStateGW') : null ;
				break;
			}
			case 'tags': {
				// Expects data to be a Action object with edits
				const action = await Action.findById(data.id);
				for (const item of data.tags) {
					await addArrayValue(action.tags, item);
				}
				action.markModified('tags');
				await action.save();
				break;
			}
			case 'controlReject': {
				// console.log(data);
				response = await controlOverride(data, client.username);
				break;
			}
			case 'deleteSubObject': {
				// console.log(data);
				response = await deleteSubObject(data, client.username);
				break;
			}
			case 'updateSubObject': {
				// console.log(data);
				response = await editSubObject(data, client.username);
				response.type === 'success' ? client.emit('clearLocalStorage', 'EditCommentGW') : null ;
				response.type === 'success' ? client.emit('clearLocalStorage', 'EditResultGW') : null ;
				break;
			}
			default:
				console.log('Bad actionRequest Request: ', type); // need an error socket to trigger
				response = { message : `Bad actionRequest Request: ${type}`, type: 'error' };
				break;
			}
			client.emit('alert', response);
		}
		catch (error) {
			client.emit('alert', { type: 'error', message: error.message ? error.message : error });
			logger.error(error);
		}
	}
};