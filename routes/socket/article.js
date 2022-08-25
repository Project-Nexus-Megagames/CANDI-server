const { logger } = require('../../middleware/log/winston'); // middleware/error.js which is running [npm] winston for error handling
const { Article } = require('../../models/article');
const { GameState } = require('../../models/gamestate');
const nexusEvent = require('../../middleware/events/events');
const { Character } = require('../../models/character');

module.exports = {
	name: 'article',
	async function(client, req) {
		try {
			logger.info(`${client.username} has made a ${req.action} request in the ${req.route} route!`);
			switch(req.action) {
			case('post'): {
				const { title, body, image, creator } = req.data;

				const gamestate = await GameState.findOne();
				const character = await Character.findById(creator);

				const article = new Article({
					creator,
					round: gamestate.round,
					title,
					body,
					image
				});
				const newArticle = await article.save();
				await newArticle.populateMe();
				// nexusEvent.emit('respondClient', 'update', [ action, ...changed ]);
				nexusEvent.emit('respondClient', 'update', [newArticle]);
				client.emit('alert', { type: 'success', message: 'Posted Article' });

				await character.expendEffort('1', 'Article');

				break;


			}
			// FIXME: [JOHN] - Editing with Franzi
			case('edit'): {
				const { id } = req.data;
				const { title, body, image, creator } = req.data.article;

				const article = await Article.findById(id);

				await article.edit({
					title,
					body,
					image,
					creator
				});
				client.emit('alert', { type: 'success', message: 'Edited Article' });
				break;
			}
			// FIXME: [JOHN] - This is Copy-pasta... fix me please?
			case('publish'): {
				const { id } = req.data;

				const article = await Article.findById(id);

				await article.publish();
				client.emit('alert', { type: 'success', message: 'Published Article' });
				break;
			}
			// FIXME: [JOHN] - This is Copy-pasta... fix me please?
			case('react'): {
				const { id, user, emoji } = req.data;

				let article = await Article.findById(id);

				const reacted = article.reactions.some(reaction => reaction.user == user && reaction.emoji == emoji);
				if (reacted) {
					article = await article.unreact(user, emoji);
					client.emit('alert', { type: 'success', message: `Unreacted with ${emoji}` });
				}
				else {
					article = await article.react(user, emoji);
					client.emit('alert', { type: 'success', message: `Reacted with ${emoji}` });
				}
				break;
			}
			// FIXME: [JOHN] - This is Copy-pasta... fix me please?
			case('comment'): {
				const { id, user, comment } = req.data;

				const article = await Article.findById(id);

				await article.comment(user, comment);
				client.emit('alert', { type: 'success', message: 'Posted Comment' });
				break;
			}
			// FIXME: [JOHN] - This is Copy-pasta... fix me please?
			case('deleteComment'): {
				const { id, commentId } = req.data;

				const article = await Article.findById(id);

				await article.deleteComment(commentId);
				client.emit('alert', { type: 'success', message: 'Deleted Comment' });
				break;
			}
			// FIXME: [JOHN] - This is Copy-pasta... review me please?
			case('delete'): {
				const { id } = req.data;

				const article = await Article.findById(id);

				await article.delete();
				client.emit('alert', { type: 'success', message: 'Deleted Article' });
				break;
			}
			default: {
				const message = `No ${req.action} is in the ${req.route} route.`;
				throw new Error(message);
			}
			}
		}
		catch (error) {
			client.emit('alert', { type: 'error', message: error.message ? error.message : error });
			logger.error(error);
		}
	}
};