const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
	constructor() {
		//? Properties
		this.port = process.env.PORT;
		this.app = express();
		this.usersPath = '/api/users';
		this.authPath = '/api/auth';

		//* Db connection
		this.connectDb();

		//* Middlewares
		this.middlewares();

		//* Routes
		this.routes();
	}

	async connectDb() {
		//* Connect to db
		await dbConnection();
	}

	middlewares() {
		// Cors
		this.app.use(cors());
		// Body Parser (json)
		this.app.use(express.json());
		// Serve static files from the public folder
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.usersPath, require('../routes/users'));
		this.app.use(this.authPath, require('../routes/auth'));
	}

	startServer() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}

module.exports = Server;
