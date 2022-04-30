const { Location } = require("../models/location");
const nexusEvent = require("../middleware/events/events"); // Local event triggers
const { logger } = require("../middleware/log/winston");
const { Asset } = require("../models/asset");

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
      unlockedBy,
    } = data;
    const location = await Location.findById(_id);
    if (location != null) {
      location.name = name;
      location.description = description;
      location.borough = borough;
      currentOwner
        ? (location.currentOwner = currentOwner)
        : (location.currentOwner = "None");
      location.influence = influence;
      location.unlockedBy = unlockedBy;

      await location.save();
      nexusEvent.emit("respondClient", "update", [location]);
      logger.info(`${location.name} edited.`);
      return { message: "Location Edit Success", type: "success" };
    } else {
      return {
        message: `Could not find a location for id "${id}"`,
        type: "error",
      };
    }
  } catch (err) {
    logger.error(err);
    return { message: err, type: "error" };
  }
}

async function unlockLocation(data) {
  let { character, location } = data;
  location = await Location.findById(location);

  if (location.unlockedBy.some((tag) => tag === character))
    return console.log("Location already unlocked by character");

  location.unlockedBy.push(character);
  location = await location.save();

  nexusEvent.emit("request", "update", [location]);
}

async function lockLocation(data) {
  const { loc, charsToRemove } = data;
  location = await Location.findById(loc);
  for (const character of charsToRemove) {
    if (location.unlockedBy.indexOf(character) === -1)
      return console.log("Character does not have location unlocked.");
    location.unlockedBy = location.unlockedBy.filter((el) => el !== character);
  }
  location = await location.save();
  nexusEvent.emit("respondClient", "update", [location]);
  logger.info(`${location.name} edited.`);
  return { message: "Location Edit Success", type: "success" };
}

module.exports = { editLocation, unlockLocation, lockLocation };
