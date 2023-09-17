const {
	createAction,
	effectAction,
	deleteAction,
	editAction,
	controlOverride,
	deleteSubObject,
	editSubObject,
	supportAgenda,
	assignController,
	diceResult,
	setNewsWorthy,
	collabAction,
  editSubmissionDifficulty,
  rollSubmission
} = require('../../game/actions');
const { addArrayValue } = require('../../middleware/util/arrayCalls');
const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling
const { Action } = require('../../models/action');
const nexusEvent = require('../../middleware/events/events');

module.exports = {
	name: 'action',
	async function (client, req) {
		logger.info(
			`${client.username} has made a ${req.action} request in the ${req.route} route!`
		);
		const data = req.data;
		const type = req.action;
		try {
			let response;
			switch (type) {
			case 'create': {
				// console.log(data);
				response = await createAction(data, client.username);

				response.type === 'success'
					? client.emit('clearLocalStorage', 'newActionStateGW')
					: null;
				break;
			}
			case 'support': {
				// Expects data.id <<Action ref>>
				// Expects data.supporter
				response = await supportAgenda(data);
				break;
			}
			case 'comment': {
				// Expects data.id <<Action ref>>
				// Expects data.comment <<Comment object>> { body, commentor, type, status }
				// console.log(data);
				const action = await Action.findById(data.id);
				action
					? (response = await action.comment(data.comment))
					: (response = {
						message: `Could not find Action for ${data.id}`,
						type: 'error'
					});
				response.type === 'success'
					? client.emit('clearLocalStorage', 'NewCommentGW')
					: null;
				break;
			}
			case('publish'): {
				let action = await Action.findById(req.id);
				action.publishDate = Date.now();

				action = await action.save();
				await action.publish();
				await action.populateMe();
				nexusEvent.emit('respondClient', 'update', [action]);
				client.emit('alert', { type: 'success', message: 'Published Agenda' });
				break;
			}

			case 'result': {
				// Expects data.id <<Action ref>>
				// Expects data.result <<Result object>> { description, resolver, dice }
				// console.log(data);
				const action = await Action.findById(data.id);
				action
					? (response = await action.postResult(data.result))
					: (response = {
						message: `Could not find Action for ${data.id} in 'result'`,
						type: 'error'
					});
				response.type === 'success'
					? client.emit('clearLocalStorage', 'newResultStateGW')
					: null;
				break;
			}
			case 'effect': {
				// Expects data.id <<Action ref>>
				// Expects data.effect <<Effect object>> { description, type, asset <<Asset ref>>, action <<Action ref>>, other }
				response = await effectAction(data, client.username);
				break;
			}

			case 'assignController': {
				response = await assignController(data, client.username);
				break;
			}

			case 'diceResult': {
				response = await diceResult(data, client.username);
				break;
			}

			case 'setNewsWorthy': {
				response = await setNewsWorthy(data, client.username);
				break;
			}
			case 'delete': {
				response = await deleteAction(data, client.username);
				break;
			}
      case 'difficulty': {
				response = await editSubmissionDifficulty(data, client.username);
				break;
			}
      case 'roll': {
				response = await rollSubmission(data, client.username);
				break;
			}
			case 'update': {
				// Expects data to be a Action object with edits
				response = await editAction(data, client.username);
				response.type === 'success'
					? client.emit('clearLocalStorage', 'selectedActionStateGW')
					: null;
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
			case 'addCollaborator': {
				// Expects data to be a Action object with edits
				const action = await Action.findById(data.id);
				if (action) {
					await action.addCollaborator(data.collaborator);
				}
				break;
			}
      case 'removeCollaborator': {
				// Expects data to be a Action object with edits
				const action = await Action.findById(data.id);
				if (action) {
					await action.removeCollaborator(data.collaborator);
				}
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
				response.type === 'success'
					? client.emit('actionCommentDeleted', data.id)
					: null;
				break;
			}
			case 'updateSubObject': {
				// console.log(data);
				response = await editSubObject(data, client.username);
				break;
			}
			case 'collab':
				response = await collabAction(data, client.username);
				break;
			default: // need an error socket to trigger
				console.log('Bad action socket Request: ', type);
				response = {
					message: `Bad action socket Request: ${type}`,
					type: 'error'
				};
				break;
			}
			client.emit('alert', response);
		}
		catch (error) {
			client.emit('alert', {
				type: 'error',
				message: error.message ? error.message : error
			});
			logger.error(error);
		}
	}
};
