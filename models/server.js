const express = require('express')
var cors = require('cors')

class Server {
	constructor() {
		//? Properties
		this.port = process.env.PORT
		this.app = express()
		this.usersPath = '/api/users'

		//* Middlewares
		this.middlewares()

		//* Routes
		this.routes()
	}

	middlewares() {
		// Cors
		this.app.use(cors())
		// Body Parser (json)
		this.app.use(express.json())
		// Serve static files from the public folder
		this.app.use(express.static('public'))
	}

	routes() {
		this.app.use(this.usersPath, require('../routes/users'))
	}

	startServer() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`)
		})
	}
}

module.exports = Server
