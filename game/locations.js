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

  //roll some dice
  

  const lootTable = [{
	id: 'snail'
	,chance: 500 // 1000 so 50%
}, {
	id: 'a cool looking rock'
	,chance: 250 // 1000 so 25%
}, {
	id: 'a smith and wesson'
	,chance: 100 // 1000 so 10%
},{
	id: 'A fucking thermal nucular bomb'
	,chance: 1 // 1000 so 1%
}
]
let filledLootBox = []
lootTable.forEach(item => {
  item.chance = chance 
  const lootItem = new Array(item.chance).fill(item.id)

  filledLootBox.push(...lootItem)
})

const pickedItem = filledLootBox[Math.floor(Math.random() * filledLootBox.length)]

console.log('picked item:', pickedItem)
console.log(filledLootBox)
const Location = mongoose.model('Location', LocationSchema);

// Loot table requirements:
  // 1) can accomodate any number of loot items
  // 2) each loot item has a probablility value
  // 3) each loot item has a quantity

	return { message: 'Location(s) successfully Scavenge', type: 'success' };
}

module.exports = { editLocation, lockLocation, scavengeLocation };
