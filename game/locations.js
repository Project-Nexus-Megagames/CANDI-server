const { Location } = require('../models/location');
const { Asset } = require('../models/asset');
const nexusEvent = require('../middleware/events/events'); // Local event triggers
const { logger } = require('../middleware/log/winston');
const { d4, d6, d20, rand } = require('../scripts/util/dice');
const nexusError = require('../middleware/util/throwError');


async function editLocation (data) {
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

function lockLocation (data) {
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

async function scavengeLocation (data) {
	const { character } = data;
	console.log('Hello!');
	// find the character, location, and asset based on the id
	const location = await Location.findById(data.location);
	const asset = await Asset.findById(data.asset);

	if (!asset)	nexusError('An asset is required for a scavenge action', 400);
  if (asset.isInUse()) nexusError(`Asset ${asset.name} is already in use`, 400);


	const filledLootBox = [];
	location.lootTable.forEach(item => {
		const lootItem = new Array(item.chance).fill(item.id);
		filledLootBox.push(...lootItem);
	});

	let rand0 = rand(filledLootBox.length) - 1;
	if (rand0 > filledLootBox.length) rand0 = filledLootBox.length;

	const pickedItem = filledLootBox[rand0];

	// get the loot item from our table
	const lootItem = location.lootTable.find(el => el._id == pickedItem);
	console.log(lootItem);

	// create new Asset
	const newAsset = new Asset();
	newAsset.name = lootItem.name;
	newAsset.type = lootItem.assetType;
	newAsset.ownerCharacter = character;
	newAsset.uses = lootItem.uses;

	await newAsset.save();
	nexusEvent.emit('respondClient', 'update', [ newAsset ]);


	// Loot table requirements:
	// 1) can accomodate any number of loot items
	// 2) each loot item has a probablility value
	// 3) each loot item has a quantity

	return { message: 'Location(s) successfully Scavenge', type: 'success' };
}


module.exports = { editLocation, lockLocation, scavengeLocation };