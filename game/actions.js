const { Character } = require("../models/character");
const nexusEvent = require("../middleware/events/events"); // Local event triggers
const { Action } = require("../models/action");
const { logger } = require("../middleware/log/winston");
const { Asset } = require("../models/asset");
const { Comment } = require("../models/comment");
const { History } = require("../models/history");
const { GameState } = require("../models/gamestate");
const { modifyAsset, addAsset } = require("./assets");

async function removeEffort(data) {
  let character = await Character.findOne({ characterName: data.creator });
  character = await character.expendEffort(data.effort);
  return character;
}

async function addEffort(data) {
  let character = await Character.findOne({ characterName: data.creator })
    .populate("assets")
    .populate("lentAssets");
  character = await character.restoreEffort(data.effort);
  return character;
}

async function createAction(data, user) {
  // Expecting -  round, creator <<character_id>>, controllers <<Array>>, submission <<submissionSchema>>
  try {
    // Data check errors!
    // if (!data.type) throw Error('New actions require a type...');
    if (!data.creator)
      throw Error("New actions must have a character _id for creator...");
    if (!data.submission) throw Error("You must include a submission...");
    if (!data.controllers)
      throw Error("New actions must have a controllers array...");
    else if (data.controllers.length < 1)
      throw Error("New actions must at least 1 controller assigned to it...");

    console.log(data);

    const { type, creator, controllers, name } = data;

    const character = await Character.findById(creator);
    const actions = await Action.find({ creator });
    const gamestate = await GameState.findOne();

    let action = new Action({
      type,
      name:
        name === ""
          ? `${character.playerName} action ${actions.length + 1}`
          : name,
      round: gamestate.round,
      creator,
      controllers,
    });

    action = await action.save();
    // console.log(action)
    await action.submit(data.submission);
    await action.populateMe();

    const log = new History({
      docType: "action",
      action: "create",
      function: "createAction",
      document: action,
      user,
      character: creator,
    });

    await log.save();

    logger.info(`${action.type} "${action._id}" created.`);

    nexusEvent.emit("respondClient", "create", [action]);
    return { message: `${action.type} Creation Success`, type: "success" };
  } catch (err) {
    console.log(err);
    logger.error(`message : Server Error: ${err}`);
    return { message: `message : Server Error: ${err.message}`, type: "error" };
  }
}

async function deleteSubObject(data, user) {
  const id = data.id;
  let action = await Action.findById(id);
  if (action != null && data.result) {
    const log = new History({
      docType: "action",
      action: "delete",
      function: "deleteResult",
      document: action,
      user,
    });
    const result = action.results.findIndex(
      (el) => el._id.toHexString() === data.result
    ); // results are populated,
    action.results.splice(result, 1);
    action = await action.save();
    await action.populateMe();

    await log.save();
    logger.info(`Result with the id ${id} was deleted via Socket!`);
    nexusEvent.emit("respondClient", "update", [action]);
  } // if
  else if (action != null && data.effect) {
    const log = new History({
      docType: "action",
      action: "delete",
      function: "deleteResult",
      document: action,
      user,
    });
    const effect = action.effects.findIndex(
      (el) => el._id.toHexString() === data.effect
    ); // effects are populated,
    action.effects.splice(effect, 1);
    action = await action.save();
    await action.populateMe();

    await log.save();
    logger.info(`effect with the id ${id} was deleted via Socket!`);
    nexusEvent.emit("respondClient", "update", [action]);
  } else if (action != null && data.comment) {
    const log = new History({
      docType: "action",
      action: "delete",
      function: "deleteComment",
      document: action,
      user,
    });
    const comment = action.comments.findIndex(
      (el) => el.toHexString() === data.comment
    ); // comments are not populated,
    action.comments.splice(comment, 1);
    action = await action.save();
    await action.populateMe();

    await log.save();
    logger.info(`Comment with the id ${id} was deleted via Socket!`);
    nexusEvent.emit("respondClient", "update", [action]);
  } // if
}

async function editSubObject(data, user) {
  const id = data.id;
  let action = await Action.findById(id);
  if (action != null && data.result) {
    const log = new History({
      docType: "action",
      action: "edit",
      function: "editResult",
      document: action,
      user,
    });
    const result = action.results.findIndex(
      (el) => el._id.toHexString() === data.result.id
    ); // results are populated,
    const thing = action.results[result];

    for (const el in data.result) {
      if (
        data.result[el] !== undefined &&
        data.result[el] !== "" &&
        el !== "_id" &&
        el !== "model"
      ) {
        thing[el] = data.result[el];
      } else {
        console.log(`Detected invalid edit: ${el} is ${data.result[el]}`);
      }
    }

    action = await action.save();
    await action.populateMe();

    await log.save();
    logger.info(`Result with the id ${id} was edited via Socket!`);
    nexusEvent.emit("respondClient", "update", [action]);
    return {
      message: `Result with the id ${id} was edited via Socket!`,
      type: "success",
    };
  } // if
  else if (action != null && data.effect) {
    const log = new History({
      docType: "action",
      action: "edit",
      function: "editEffect",
      document: action,
      user,
    });
    const effect = action.effects.findIndex(
      (el) => el._id.toHexString() === data.effect.id
    ); // effects are populated,
    const thing = action.effects[effect];

    for (const el in data.effect) {
      if (
        data.effect[el] !== undefined &&
        data.effect[el] !== "" &&
        el !== "_id" &&
        el !== "model"
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
    nexusEvent.emit("respondClient", "update", [action]);
    return {
      message: `Result with the id ${id} was edited via Socket!`,
      type: "success",
    };
  } // if
  else if (action != null && data.comment) {
    const log = new History({
      docType: "action",
      action: "edit",
      function: "editComment",
      document: action,
      user,
    });
    const comment = await Comment.findByIdAndUpdate(
      data.comment._id,
      data.comment,
      { new: true }
    ).populate("creator");
    action = await Action.findById(id);
    action = await action.save();
    await action.populateMe();

    await log.save();
    logger.info(`Comment with the id ${id} was edited via Socket!`);
    nexusEvent.emit("respondClient", "update", [action]);
    return {
      message: `Comment with the id ${id} was edited via Socket!`,
      type: "success",
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
        docType: "action",
        action: "delete",
        function: "deleteAction",
        document: action,
        user,
      });

      const character = await Character.findById(action.creator);
      await character.restoreEffort(action.submission.effort);
      nexusEvent.emit("respondClient", "update", [character]);

      for (const item of action.submission.assets) {
        if (
          !action.submission.assets.some(
            (el) => el.toString() === item.toString()
          )
        ) {
          let asset = await Asset.findById(item);
          asset
            ? (asset = await asset.unuse())
            : console.log("Avoided un-using a thing!");
          changed.push(asset);
        }
      }

      action = await Action.findByIdAndDelete(id);
      await log.save();

      logger.info(`Action with the id ${id} was deleted via Socket!`);
      nexusEvent.emit("respondClient", "delete", [{ model: "action", id }]);
      nexusEvent.emit("respondClient", "update", [changed]);
      return { message: "Action Delete Success", type: "success" };
    } else {
      return { message: `No action with the id ${id} exists!`, type: "error" };
    }
  } catch (err) {
    logger.error(`message : Server Error: ${err.message}`);
    return { message: `Server Error: ${err.message}`, type: "error" };
  }
}

async function controlOverride(data, user) {
  try {
    const { id, asset } = data;
    let action = await Action.findById(id);
    if (!action)
      return { message: `No action with the id ${id} exists!`, type: "error" };
    const item = await Asset.findById(asset);
    if (!item)
      return {
        message: `No asset with the id ${asset} exists!`,
        type: "error",
      };

    console.log(asset);
    console.log(action.submission.assets[0] == asset);
    const i = action.submission.assets.findIndex((el) => el == asset);
    if (i > -1) {
      action.submission.assets.splice(i, 1);
      action.markModified("assets");
      action = await action.save();
      action.comment({
        body: `Control Override: ${item.name} removed from action by Control.`,
        commentor: "Grunkle the Tech Goblin",
        type: "Info",
      });

      const log = new History({
        docType: "action",
        action: "override",
        function: "controlOverride",
        document: action,
        user,
      });

      await log.save();

      logger.info(`Asset ${asset} removed`);
      nexusEvent.emit("respondClient", "update", [action]);
      return { message: `Asset ${asset} removed`, type: "success" };
    } else {
      throw Error(`Asset ${item.name} is not attached to this action.`);
    }
  } catch (err) {
    logger.error(`message : Server Error: ${err.message}`);
    return { message: `Server Error: ${err.message}`, type: "error" };
  }
}

async function editAction(data, user) {
  const { id } = data;
  const changed = [];
  const oldAction = await Action.findById(id);

  if (!id) throw Error("Actions must have an _id...");
  if (oldAction === undefined) throw Error("Could not find oldAction");

  let action = await Action.findByIdAndUpdate(id, data, { new: true }).populate(
    "creator"
  );

  // const character = await Character.findById(action.creator._id).populate('lentAssets');
  // await character.expendEffort(action.effort - oldAction.effort);

  // let comment = new Comment({
  // 	body: `${user} edited this action...`,
  // 	author: user,
  // 	type: 'Info'
  // });
  // comment = await comment.save(); // Saves comment

  // action.comments.push(comment._id);
  // action.markModified('comments');

  action = await action.save();
  await action.populateMe();

  const log = new History({
    docType: "action",
    action: "edit",
    function: "newEditAction",
    user,
    document: action,
  });

  for (const item of oldAction.submission.assets) {
    if (!action.submission.assets.some((el) => el === item.toString())) {
      let asset = await Asset.findById(item);
      asset
        ? (asset = await asset.unuse())
        : console.log("Avoided un-using a thing!");
      changed.push(asset);
    }
  }

  for (const item of action.submission.assets) {
    if (!oldAction.submission.assets.some((el) => el === item.toString())) {
      let asset = await Asset.findById(item);
      asset
        ? (asset = await asset.use())
        : console.log("Avoided using a thing!");
      changed.push(asset);
    }
  }

  await log.save(); // Saves history log
  nexusEvent.emit("respondClient", "update", [action, ...changed]);
  console.log(`${action.type} "${action.name}" edited.`);
  return { message: `${action.type} Edit Success`, type: "success" };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function effectAction(data, username) {
  try {
    const { type, document, owner } = data;
    const action = await Action.findById(data.action);
    if (!action) throw Error("No Action for Effect!");
    let response;
    let old;
    const effects = [];
    switch (type) {
      case "asset":
        old = await Asset.findById(document._id).populate("with");
        break;
      case "bond":
        old = await Asset.findById(document._id).populate("with");
        break;
      case "aspect":
        old = await Character.findById(document._id);
        break;
      case "new":
        response = await addAsset({ asset: document });
        response.type === "success"
          ? await action.addEffect({
              description: `New ${document.type} created: ${document.name} ${
                document.level ? `(${document.level})` : `(${document.dice})`
              }`,
              type: document.type,
              status: "Temp-Hidden",
            })
          : null;
        return response;
      case "map":
        return console.log("Map effectAction triggered ", document, owner);
        break;
      default:
        console.log(`Invalid effectAction switch type ${type}`);
        return {
          message: `Invalid effectAction switch type ${type}`,
          type: "error",
        };
    }

    if (!old) throw Error("No Old thing for the thing... you know the thing?");
    for (const el in document) {
      if (
        document[el] !== undefined &&
        document[el] !== "" &&
        el !== "_id" &&
        el !== "with" &&
        el !== "status" &&
        el !== "type" &&
        el !== "ownerCharacter" &&
        el !== "model" &&
        typeof document[el] !== "object" &&
        old[el] !== document[el] &&
        document[el] !== "None"
      ) {
        effects.push({
          description: `${old.model} named *${
            old.name ? old.name : old.characterName
          }* had it's ${capitalizeFirstLetter(el)} changed: ${old[el]} => ${
            document[el]
          } `,
          type: old.model,
          bond: old._id,
          status: type === "aspect" ? "Private" : "Temp-Hidden",
        });
        old[el] = document[el];
      } else {
        // leaving this in case I have to debug
        // console.log(document[el]);
        // console.log(`Detected invalid edit: ${el} is ${document[el]}`);
      }
    }

    await old.save();
    nexusEvent.emit("respondClient", "update", [old]);

    for (const effect of effects) {
      await action.addEffect(effect);
    }
    return response;
  } catch (err) {
    logger.error(`message : Server Error: ${err.message}`);
    return { message: `Server Error: ${err.message}`, type: "error" };
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
};
