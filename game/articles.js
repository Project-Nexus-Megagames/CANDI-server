/* eslint-disable no-mixed-spaces-and-tabs */

const nexusEvent = require('../middleware/events/events'); // Local event triggers
// const nexusError = require('../middleware/util/throwError');
const { Article } = require('../models/article');
const { logger } = require('../middleware/log/winston');

async function draftArticle(data) {
	const { title, body, image, creator, tags, anon, round } = data;
	try {
		const article = new Article({
			creator,
			title,
			body,
			image,
			anon,
			round,
			tags: [...tags, 'Draft']
		});
		const newArticle = await article.save();
		await newArticle.populateMe();
		nexusEvent.emit('respondClient', 'update', [newArticle]);
		return ({ message : 'Character Creation Success', type: 'success' });
	}
	catch (err) {
		logger.error(`message : Server Error: ${err.message}`);
		return ({ message : `message : Server Error: ${err.message}`, type: 'error' });
	}
}
module.exports = {
	draftArticle
};
