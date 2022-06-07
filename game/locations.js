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
		let location = await Location.findById(_id);
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
			location = await location.populateMe();
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

function lockLocation(data) {
	const { locsToRemove, selectedChar } = data;
	locsToRemove.forEach(async (locToRemove) => {
		let loc = await Location.findById(locToRemove);
		if (loc.unlockedBy.indexOf(selectedChar) === -1) {
			return {
				message: 'Character does not have location unlocked.',
				type: 'error'
			};
		}
		loc.unlockedBy = loc.unlockedBy.filter((el) => el != selectedChar);
		await loc.save();
		loc = await loc.populateMe();
		nexusEvent.emit('respondClient', 'update', [loc]);
		logger.info(`${loc.name} edited.`);
		return { message: 'Location Edit Success', type: 'success' };
	});
	return { message: 'Location(s) successfully locked', type: 'success' };
}

module.exports = { editLocation, lockLocation };
