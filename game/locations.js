const { Location } = require('../models/location');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { d4, d6, d20 } = require('../scripts/util/dice');


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

function scavengeLocation(data) {
	const { character, location, cd } = data;
  console.log("Hello!")
  // find the character, location, and asset based on the id
 var loot = ""
  const result = d20()
  console.log(result)
  	switch(result){
		case 1:  case 2 :  case 3 :  case 4 :  case 5 :   case 6 :  case 7 : case 8 : case 9 : case 10 :
		loot = "snails"
			break;
		case 11 : case 12 : case 13: case 14: case 15 :
		loot = "a rock"
			break;
		case 16: case 17: case 18: case 19:
		loot = "a fully loaded smith and wesson"
			break;
		case 20: 
		loot = "A FUCKING THERMAL NUCULAR BOMB"
			break;
		default:
			loot = "dont look at me while im naked!"
	}
	console.log(loot)
        
	

	

	


// Loot table requirements:
  // 1) can accomodate any number of loot items
  // 2) each loot item has a probablility value
  // 3) each loot item has a quantity

	return { message: 'Location(s) successfully Scavenge', type: 'success' };
}

module.exports = { editLocation, lockLocation, scavengeLocation };