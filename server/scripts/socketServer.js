class SocketServer {
	constructor() {
		this.connections = [];
		this.saveUser = this.saveUser.bind(this);
		this.delClient = this.delClient.bind(this);
		this.getUsers = this.getUsers.bind(this);
	}
	saveUser(data, client) {
		client.username = data.username;
		const index = this.connections.findIndex(el => el.id === client.id);
		this.connections[index] = client;
		console.log(`${this.connections[index].username} Registered to web socket...`);
		console.log(`Users Connected: ${this.connections.length}`);
		return;
	}

	delClient(client) {
		const index = this.connections.findIndex(el => el.id === client.id);
		console.log(`${this.connections[index].username} unsubscribed.`);
		this.connections.splice(index, 1);
		return;
	}
	getUsers() {
		const users = [];
		for (const client of this.connections) {
			const user = {
				name: client.username,
				id: client.id
			};
			users.push(user);
		}
		return users;
	}
}

module.exports = SocketServer;