const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
	constructor() {
		//? Properties
		this.port = process.env.PORT;
		this.app = express();
		this.paths = {
			auth: '/api/auth',
			categories: '/api/categories',
			products: '/api/products',
			search: '/api/search',
			users: '/api/users',
		};

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
		this.app.use(this.paths.auth, require('../routes/auth'));
		this.app.use(this.paths.categories, require('../routes/categories'));
		this.app.use(this.paths.products, require('../routes/products'));
		this.app.use(this.paths.search, require('../routes/search'));
		this.app.use(this.paths.users, require('../routes/users'));
	}

	startServer() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}

module.exports = Server;
