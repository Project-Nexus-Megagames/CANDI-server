function nexusError(message, status) {
	console.log(error);
	const error = new Error(message);
	error.status = status;
	throw error;
}

module.exports = nexusError;