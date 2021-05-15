const { Location } = require('../models/location');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { Asset } = require('../models/asset');

async function editLocation(data) {
	console.log(data);
	try {
		const { id, name, description, borough, currentOwner, influence } = data;
		const location = await Location.findById(id);
		if (location != null) {
			location.name = name;
			location.description = description;
			location.borough = borough;
			currentOwner ? location.currentOwner = currentOwner : location.currentOwner = 'None';
			location.influence = influence;

			await location.save();
			nexusEvent.emit('respondClient', 'update', [ location ]);
			logger.info(`${location.name} edited.`);
			return { message : 'Location Edit Success', type: 'success' };
		}
		else {
			return ({ message : `Could not find a location for id "${id}"`, type: 'error' });
		}
	}
	catch (err) {
		logger.error(err);
		return { message : err, type: 'error' };
	}

}


module.exports = { editLocation };