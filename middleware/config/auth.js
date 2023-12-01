const jwt = require('jsonwebtoken');
const axios = require('axios');

const auth = async (req, res, next) => {
	console.log('Attempting to Authenticate Route...');
	try {
		const { data } = await axios.request({
			// url: 'https://alpha-nexus-server.herokuapp.com/auth/tokenLogin',
			url: "https://nexus-server.onrender.com/auth/tokenLogin",
			method: 'post',
			data: req.body
		});
		req.token = data.token;
		req.user = data.user;
		req.discord = data.discord;
		console.log(data);
		// res.status(200).send(response.data);
		// } catch (err) {
		//   console.error(err);
		next();
		// let express know that middleware is done and to move on to the route handler
	}
	catch (e) {
		console.log(e);
		// pass on the actual error we're getting
		res.status(401).send('Please authenticate');
	}
};

module.exports = auth;
