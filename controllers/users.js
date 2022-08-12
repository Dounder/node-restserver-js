const { response, request } = require('express')

const userGet = (req = request, res = response) => {
	const { q, name = 'No name', api_key } = req.query

	res.json({ message: 'get - controller', queries: { q, name, api_key } })
}

const userPost = (req, res = response) => {
	const { name, age } = req.body

	res.status(201).json({ message: 'post - controller', data: { name, age } })
}

const userPut = (req, res = response) => {
	const { id } = req.params

	res.status(400).json({ message: 'put - controller', id })
}

const userDelete = (req, res = response) => res.json({ message: 'delete - controller' })

const userPatch = (req, res = response) => res.json({ message: 'patch - controller' })

module.exports = { userGet, userPost, userPut, userDelete, userPatch }
