const { Location } = require('../models/location');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');


async function editLocation(data) {
	console.log(data);
	try {
		const {
			_id,
			name,
			description,
			borough,
			currentOwner,
			influence,
			unlockedBy
		} = data;
		const location = await Location.findById(_id);
		if (location != null) {
			location.name = name;
			location.description = description;
			location.borough = borough;
			currentOwner
				? (location.currentOwner = currentOwner)
				: (location.currentOwner = 'None');
			location.influence = influence;
			location.unlockedBy = unlockedBy;

			await location.save();
			nexusEvent.emit('respondClient', 'update', [location]);
			logger.info(`${location.name} edited.`);
			return { message: 'Location Edit Success', type: 'success' };
		}
		else {
			return {
				message: `Could not find a location for id "${_id}"`,
				type: 'error'
			};
		}
	}
	catch (err) {
		logger.error(err);
		return { message: err, type: 'error' };
	}
}


async function lockLocation(data) {
	const { loc, charsToRemove } = data;

	const location = await Location.findById(loc);
	for (const character of charsToRemove) {
		if (location.unlockedBy.indexOf(character) === -1) {
			return {
				message: 'Character does not have location unlocked.',
				type: 'error'
			};
		}
		location.unlockedBy = location.unlockedBy.filter((el) => el != character);
	}
	await location.save();
	nexusEvent.emit('respondClient', 'update', [location]);
	logger.info(`${location.name} edited.`);
	return { message: 'Location Edit Success', type: 'success' };
}

module.exports = { editLocation, lockLocation };
