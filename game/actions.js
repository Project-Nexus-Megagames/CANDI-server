/* eslint-disable no-mixed-spaces-and-tabs */
const { Character } = require('../models/character');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { Action } = require('../models/action');
const { logger } = require('../middleware/log/winston');
const { Asset } = require('../models/asset');
const { Comment } = require('../models/comment');
const { History } = require('../models/history');
const { GameState } = require('../models/gamestate');
const { addAsset } = require('./assets');
const { Location } = require('../models/location');
const { GameConfig } = require('../models/gameConfig');
const { ControlLog } = require('../models/log');

async function removeEffort(data) {
	let character = await Character.findOne({ characterName: data.creator });
	console.log('remove effort called', data);
	character = await character.expendEffort(data.effort);
	return character;
}

async function addEffort(data) {
	console.log(data);
	let character = await Character.findOne({ characterName: data.creator });
	character = await character.restoreEffort(data.effort, data.type);
	return character;
}

async function createAction(data, user) {
	// Expecting -  round, creator <<character_id>>, controllers <<Array>>, submission <<submissionSchema>>
	try {
		// Data check errors!
		// if (!data.type) throw Error('New actions require a type...');
		if (!data.creator) {
			throw Error('New actions must have a character _id for creator...');
		}
		if (!data.submission) throw Error('You must include a submission...');
		const gamestate = await GameState.findOne();
		if (gamestate.status !== 'Active') throw Error('Round is not active.');

		const { type, creator, name, numberOfInjuries, submission, attachments } =
			data;

		const character = await Character.findById(creator);
		const actions = await Action.find({ creator });
		const config = await GameConfig.findOne();

		const actionType = config.actionTypes.find(
			(el) => el.type.toLowerCase() === data.type.toLowerCase()
		);
		if (!actionType) throw Error(`Action for type ${data.type} is undefined`);
		const allowedAssets = actionType.resourceTypes;

		for (const id of data.submission.assets) {
			const asset = await Asset.findById(id);
			const allowed = allowedAssets.find(
				(el) => el.toLowerCase() === asset.type.toLowerCase()
			);
			console.log('HELLO', allowed);
			if (allowed === 'test') {
				throw Error(
					`Asset of type ${asset.type} not allowed for ${data.type}!`
				);
			}
		}

		let action = new Action({
			type,
			name:
				name === ''
					? `${character.playerName} action ${actions.length + 1}`
					: name,
			round: gamestate.round,
			attachments,
			creator,
			numberOfInjuries
		});

		action = await action.save();
		await action.submit(data.submission, data.type, config.actionTypes);
		await action.populateMe();

		nexusEvent.emit('respondClient', 'update', [action]);

		// console.log(action)
		if (submission.effort.amount > 0) {
			await character.expendEffort(
				submission.effort.amount,
				submission.effort.effortType
			);
		}

		const log = new History({
			docType: 'action',
			action: 'create',
			function: 'createAction',
			document: action,
			user,
			character: creator
		});

		await log.save();

		logger.info(`${action.type} "${action._id}" created.`);

		// nexusEvent.emit('respondClient', 'create', [action]);
		return { message: `${action.type} Creation Success`, type: 'success' };
	} catch (err) {
		console.log(err);
		logger.error(`message : Server Error: ${err}`);
		return {
			message: `message : Server Error: ${err.message}`,
			type: 'error'
		};
	}
}

async function supportAgenda(data) {
	try {
		let character = await Character.findById(data.supporter);
		const action = await Action.findById(data.id);
		console.log('Remove effort called', character.characterName);
		character = await character.expendEffort(1, 'Agenda');

		await action.comment({
			body: `${character.characterName} supports this!`,
			status: 'Public',
			commentor: character,
			type: 'Info'
		});

		return { message: `${action.name} supported!`, type: 'success' };
	} catch (err) {
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function assignController(data) {
	try {
		let action = await Action.findById(data.id);
		action.controller = data.controller;
		action = await action.save();
		await action.populateMe();
		nexusEvent.emit('respondClient', 'update', [action]);
		return { message: `${action.name} controller assigned!`, type: 'success' };
	} catch (err) {
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function diceResult(data) {
	try {
		let action = await Action.findById(data.id);
		action.diceresult = data.diceresult;
		action = await action.save();
		await action.populateMe();
		nexusEvent.emit('respondClient', 'update', [action]);
		return { message: `${action.name} diceresult logged!`, type: 'success' };
	} catch (err) {
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function setNewsWorthy(data) {
	try {
		let action = await Action.findById(data.id);
		action.news = data.news;
		action = await action.save();
		await action.populateMe();
		nexusEvent.emit('respondClient', 'update', [action]);
		return { message: `${action.name} newsworthiness set`, type: 'success' };
	} catch (err) {
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}
async function deleteSubObject(data, user) {
	const id = data.id;
	let action = await Action.findById(id);
	if (action != null && data.result) {
		const log = new History({
			docType: 'action',
			action: 'delete',
			function: 'deleteResult',
			document: action,
			user
		});
		const result = action.results.findIndex(
			(el) => el._id.toHexString() === data.result
		); // results are populated,
		action.results.splice(result, 1);
		action = await action.save();
		await action.populateMe();

		await log.save();
		logger.info(`Result with the id ${id} was deleted via Socket!`);
		nexusEvent.emit('respondClient', 'update', [action]);
	} else if (action != null && data.effect) {
		const log = new History({
			docType: 'action',
			action: 'delete',
			function: 'deleteResult',
			document: action,
			user
		});
		const effect = action.effects.findIndex(
			(el) => el._id.toHexString() === data.effect
		); // effects are populated,
		action.effects.splice(effect, 1);
		action = await action.save();
		await action.populateMe();

		await log.save();
		logger.info(`effect with the id ${id} was deleted via Socket!`);
		nexusEvent.emit('respondClient', 'update', [action]);
	} else if (action != null && data.comment) {
		const log = new History({
			docType: 'action',
			action: 'delete',
			function: 'deleteComment',
			document: action,
			user
		});
		const comment = action.comments.findIndex(
			(el) => el.toHexString() === data.comment
		); // comments are not populated,
		action.comments.splice(comment, 1);
		action = await action.save();
		await action.populateMe();
		console.log(action.populated('comments'));
		await log.save();
		logger.info(`Comment with the id ${id} was deleted via Socket!`);
		nexusEvent.emit('respondClient', 'update', [action]);
		return {
			message: `Comment with the id ${id} was deleted via Socket!`,
			type: 'success'
		};
	} // if
}

// Used to edit comments, results, or effects of an action. probably should be seperate functions, but...
async function editSubObject(data, user) {
	const id = data.id;
	let action = await Action.findById(id);
	if (action != null && data.result) {
		const log = new History({
			docType: 'action',
			action: 'edit',
			function: 'editResult',
			document: action,
			user
		});
		const result = action.results.findIndex(
			(el) => el._id.toHexString() === data.result.id
		); // results are populated,
		const thing = action.results[result];

		for (const el in data.result) {
			if (
				data.result[el] !== undefined &&
				data.result[el] !== '' &&
				el !== '_id' &&
				el !== 'model'
			) {
				thing[el] = data.result[el];
			} else {
				console.log(`Detected invalid edit: ${el} is ${data.result[el]}`);
			}
		}
		action.diceresult = data.dice;
		action = await action.save();
		await action.populateMe();

		await log.save();
		logger.info(`Result with the id ${id} was edited via Socket!`);
		nexusEvent.emit('respondClient', 'update', [action]);
		return {
			message: `Result with the id ${id} was edited via Socket!`,
			type: 'success'
		};
	} // if
	else if (action != null && data.effect) {
		const log = new History({
			docType: 'action',
			action: 'edit',
			function: 'editEffect',
			document: action,
			user
		});
		const effect = action.effects.findIndex(
			(el) => el._id.toHexString() === data.effect.id
		); // effects are populated,
		const thing = action.effects[effect];

		for (const el in data.effect) {
			if (
				data.effect[el] !== undefined &&
				data.effect[el] !== '' &&
				el !== '_id' &&
				el !== 'model'
			) {
				thing[el] = data.effect[el];
			} else {
				console.log(`Detected invalid edit: ${el} is ${data.effect[el]}`);
			}
		}

		action = await action.save();
		await action.populateMe();

		await log.save();
		logger.info(`Result with the id ${id} was edited via Socket!`);
		nexusEvent.emit('respondClient', 'update', [action]);
		return {
			message: `Result with the id ${id} was edited via Socket!`,
			type: 'success'
		};
	} // if
	else if (action != null && data.comment) {
		const log = new History({
			docType: 'action',
			action: 'edit',
			function: 'editComment',
			document: action,
			user
		});
		await Comment.findByIdAndUpdate(data.comment._id, data.comment, {
			new: true
		}).populate('commentor');
		action = await Action.findById(id);
		action = await action.save();
		await action.populateMe();

		await log.save();
		logger.info(
			`Comment with the id ${data.comment._id} was edited via Socket!`
		);
		nexusEvent.emit('respondClient', 'update', [action]);
		return {
			message: `Comment with the id ${data.comment._id} was edited via Socket!`,
			type: 'success'
		};
	} // if
}

async function deleteAction(data, user) {
	try {
		const id = data.id;
		let action = await Action.findById(id);
		const changed = [];

		if (action != null) {
			const log = new History({
				docType: 'action',
				action: 'delete',
				function: 'deleteAction',
				document: action,
				user
			});

			const character = await Character.findById(action.creator);
			const config = await GameConfig.findOne();
			await character.restoreEffort(
				action.submission.effort.amount,
				action.submission.effort.effortType,
				config.effortTypes
			);
			nexusEvent.emit('respondClient', 'update', [character]);

			for (const item of action.submission.assets) {
				let asset = await Asset.findById(item);
				asset
					? (asset = await asset.unuse())
					: console.log('Avoided un-using a thing!');
				changed.push(asset);
			}

			action = await Action.findByIdAndDelete(id);
			await log.save();

			logger.info(`Action with the id ${id} was deleted via Socket!`);
			nexusEvent.emit('respondClient', 'delete', [{ model: 'action', id }]);
			nexusEvent.emit('respondClient', 'update', changed);
			return { message: 'Action Delete Success', type: 'success' };
		} else {
			return {
				message: `No action with the id ${id} exists!`,
				type: 'error'
			};
		}
	} catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function controlOverride(data, user) {
	const char = await Character.findOne({ username: user });
	try {
		const { id, asset } = data;
		let action = await Action.findById(id);
		if (!action) {
			return {
				message: `No action with the id ${id} exists!`,
				type: 'error'
			};
		}
		const item = await Asset.findById(asset);
		if (!item) {
			return {
				message: `No asset with the id ${asset} exists!`,
				type: 'error'
			};
		}

		const i = action.submission.assets.findIndex((el) => el == asset);
		if (i > -1) {
			action.submission.assets.splice(i, 1);
			action.markModified('assets');
			action = await action.save();
			item.unuse();
			action.comment({
				body: `Control Override: ${item.name} removed from action by Control.`,
				commentor: char,
				type: 'Info'
			});

			const log = new History({
				docType: 'action',
				action: 'override',
				function: 'controlOverride',
				document: action,
				user
			});

			await log.save();

			const controlLog = new ControlLog({
				controlAction: 'ActionOverride',
				control: user,
				affectedThing: item.name,
				affectedAction: action.name,
				message: `Removed ${item.name} from action ${action.name}`
			});

			await controlLog.save();

			logger.info(`Asset ${asset} removed`);
			return { message: `Asset ${asset} removed`, type: 'success' };
		} else {
			throw Error(`Asset ${item.name} is not attached to this action.`);
		}
	} catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

async function editAction(data, user) {
	const { id } = data;
	const changed = [];
	const oldAction = await Action.findById(id);

	if (!id) throw Error('Actions must have an _id...');
	if (oldAction === undefined) throw Error('Could not find oldAction');

	let action = await Action.findByIdAndUpdate(id, data, {
		new: true
	}).populate('creator');

	if (action.submission.effort.amount !== oldAction.submission.effort.amount) {
		let character = await Character.findById(action.creator._id);
		character = await character.expendEffort(
			action.submission.effort.amount - oldAction.submission.effort.amount,
			action.submission.effort.effortType
		);
		nexusEvent.emit('respondClient', 'update', [character]);
	}

	// let comment = new Comment({
	// 	body: `${user} edited this action...`,
	// 	commentor: user,
	// 	type: 'Info'
	// });
	// comment = await comment.save(); // Saves comment

	// action.comments.push(comment._id);
	// action.markModified('comments');

	action = await action.save();
	await action.populateMe();

	const log = new History({
		docType: 'action',
		action: 'edit',
		function: 'newEditAction',
		user,
		document: action
	});

	for (const item of oldAction.submission.assets) {
		if (!action.submission.assets.some((el) => el === item.toString())) {
			let asset = await Asset.findById(item);
			asset
				? (asset = await asset.unuse())
				: console.log('Avoided un-using a thing!');
			changed.push(asset);
		}
	}

	for (const item of action.submission.assets) {
		if (!oldAction.submission.assets.some((el) => el === item.toString())) {
			let asset = await Asset.findById(item);
			asset
				? (asset = await asset.use())
				: console.log('Avoided using a thing!');
			changed.push(asset);
		}
	}

	await log.save(); // Saves history log
	nexusEvent.emit('respondClient', 'update', [action, ...changed]);
	console.log(`${action.type} "${action.name}" edited.`);
	return { message: `${action.type} Edit Success`, type: 'success' };
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

async function effectAction(data) {
	try {
		const { type, document, owner, arcane, loggedInUser, effector } = data;
		const action = await Action.findById(data.action);
		const controlLog = new ControlLog({
			controlAction: 'ActionEffect',
			control: loggedInUser.username,
			affectedAction: action.name
		});
		if (!action) throw Error('No Action for Effect!');
		let response;
		let old;
		const effects = [];

		switch (type) {
			case 'asset':
				old = await Asset.findById(document._id);
				controlLog.message = `Asset ${old.name} was edited`;
				await controlLog.save();
				break;
			case 'bond':
				old = await Asset.findById(document._id);
				controlLog.message = `Bond ${old.name} was edited`;
				await controlLog.save();
				break;
			case 'aspect':
				old = await GameState.findOne();
				controlLog.message = ' ';
				for (const el in document) {
					if (parseInt(document[el]) !== 0) {
						const oldAspectValue = old.globalStats.find(
							(stat) => stat.type === el
						).statAmount;
						old.globalStats.find((stat) => stat.type === el).statAmount +=
							parseInt(document[el]);
						await action.addEffect({
							description: `${el} changed from ${oldAspectValue} to ${
								oldAspectValue + parseInt(document[el])
							} `,
							type: 'aspect',
							status: 'Private',
							effector
						});

						await action.comment({
							body: `${el} has changed`,
							commentor: effector,
							type: 'Info'
						});

						controlLog.message =
							controlLog.message +
							` Aspect ${el} was changed from ${oldAspectValue} to ${old.globalStats[el]}.`;
					}
				}
				await controlLog.save();
				await old.save();
				nexusEvent.emit('respondClient', 'update', [old]);
				return;
			case 'character-stat':
				old = await Character.findById(owner);
				controlLog.message = ' ';
				for (const el in document) {
					if (parseInt(document[el]) !== 0) {
						// const oldAspectValue = old.characterStats[el].characterStats;
						// old.characterStats[el].characterStats = old.characterStats[el].characterStats + parseInt(document[el]);
						const oldAspectValue = await old.restoreStat(
							parseInt(document[el]),
							el
						);
						await action.addEffect({
							description: `${el} changed from ${document[el]} to ${oldAspectValue} `,
							type: 'aspect',
							status: 'Private',
							effector
						});

						await action.comment({
							body: `${el} has changed`,
							commentor: effector,
							type: 'Info'
						});

						controlLog.message =
							controlLog.message +
							` character-stat ${el} was changed from ${document[el]} to ${oldAspectValue}.`;
					}
				}
				await controlLog.save();
				await old.save();
				old = await old.populateMe();
				nexusEvent.emit('respondClient', 'update', [old]);
				return;
			case 'new':
				response = await addAsset({ asset: document, arcane, loggedInUser });
				response.type === 'success'
					? await action.addEffect({
							description: `New ${document.type} created: ${document.name} ${
								document.level ? `(${document.level})` : `(${document.dice})`
							}`,
							type: document.type,
							status: 'Temp-Hidden',
							effector
					  })
					: null;
				controlLog.message = `New ${document.type} created: ${document.name} for ${owner}`;
				await controlLog.save();
				return response;
			case 'map': {
				let locsForMessage = '';
				for (const el of document) {
					old = await Location.findById(el);
					if (!old.unlockedBy.includes(owner)) {
						old.unlockedBy.push(owner);
						await action.addEffect({
							description: `New location unlocked: ${old.name} `,
							type: 'location',
							status: 'Temp-Hidden',
							effector
						});
						controlLog.message = `New location unlocked: ${old.name} for ${owner} `;
						locsForMessage = locsForMessage + old.name + ', ';
						await old.save();
						const loc = await old.populateMe();
						await controlLog.save();
						nexusEvent.emit('respondClient', 'update', [loc]);
					}
				}
				return { message: `${locsForMessage} unlocked`, type: 'success' };
			}
			case 'character': {
				old = await Character.findById(owner);
				for (const id of document) {
					if (old.knownContacts.findIndex((el) => el == id) === -1) {
						old.knownContacts.push(id);
					}
				}
				await action.addEffect({
					description: 'New character(s) unlocked',
					type: 'character',
					status: 'Temp-Hidden',
					effector
				});
				controlLog.message = `New character(s) unlocked for ${old.characterName} `;
				await old.save();
				const char = await old.populateMe();
				nexusEvent.emit('respondClient', 'update', [char]);
				await controlLog.save();
				return {
					message: 'Character(s) successfully unlocked',
					type: 'success'
				};
			}
			case 'addInjury': {
				const { received, duration, actionTitle, name, permanent } = document;
				old = await Character.findById(owner);
				const inj = {
					actionTitle,
					received,
					permanent,
					duration: parseInt(duration),
					name
				};
				old.injuries.push(inj);
				await action.addEffect({
					description: `${name} added to ${old.characterName} `,
					type: 'injury',
					status: 'Temp-Hidden',
					effector
				});
				await old.save();
				controlLog.message = `Injury added to ${old.characterName} `;
				const char = await old.populateMe();
				nexusEvent.emit('respondClient', 'update', [char]);
				await controlLog.save();
				return { message: `1 Injury added to ${char.characterName}` };
			}
			case 'healInjuries': {
				old = await Character.findById(owner);
				let injuryCount = 0;
				for (const el of document) {
					old.injuries = old.injuries.filter((injury) => el != injury._id);
					injuryCount++;
				}
				await action.addEffect({
					description: `${injuryCount} injuries healed for ${old.characterName}. `,
					type: 'injury',
					status: 'Temp-Hidden',
					effector
				});
				controlLog.message = `Injury healed of ${old.characterName} `;
				await old.save();
				const char = await old.populateMe();
				nexusEvent.emit('respondClient', 'update', [char]);
				await controlLog.save();
				return { message: `${injuryCount} injuries healed!`, type: 'success' };
			}

			default:
				console.log(`Invalid effectAction switch type ${type}`);
				return {
					message: `Invalid effectAction switch type ${type}`,
					type: 'error'
				};
		}

		if (!old) throw Error('No Old thing for the thing... you know the thing?');
		for (const el in document) {
			if (
				document[el] !== undefined &&
				document[el] !== '' &&
				el !== '_id' &&
				el !== 'with' &&
				el !== 'status' &&
				el !== 'type' &&
				el !== 'ownerCharacter' &&
				el !== 'model' &&
				typeof document[el] !== 'object' &&
				old[el] !== document[el] &&
				document[el] !== 'None'
			) {
				effects.push({
					description: `${old.model} named *${
						old.name ? old.name : old.characterName
					}* had it's ${capitalizeFirstLetter(el)} changed: ${old[el]} => ${
						document[el]
					} `,
					type: old.model,
					bond: old._id,
					status: type === 'aspect' ? 'Private' : 'Temp-Hidden',
					effector
				});
				old[el] = document[el];
			} else {
				// leaving this in case I have to debug
				// console.log(document[el]);
				// console.log(`Detected invalid edit: ${el} is ${document[el]}`);
			}
		}

		await old.save();
		nexusEvent.emit('respondClient', 'update', [old]);

		for (const effect of effects) {
			await action.addEffect(effect);
		}
		return response;
	} catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return { message: `Server Error: ${err.message}`, type: 'error' };
	}
}

module.exports = {
	removeEffort,
	addEffort,
	createAction,
	deleteAction,
	controlOverride,
	editAction,
	deleteSubObject,
	editSubObject,
	effectAction,
	supportAgenda,
	assignController,
	diceResult,
	setNewsWorthy
};
