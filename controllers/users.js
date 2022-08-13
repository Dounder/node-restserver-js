const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const userGet = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const filter = { status: true };

	const [total, users] = await Promise.all([
		User.countDocuments(filter),
		User.find(filter).limit(Number(limit)).skip(Number(from)),
	]);

	res.json({ total, users });
};

const userPost = async (req, res = response) => {
	try {
		const { name, email, password, role } = req.body;
		const user = new User({ name, email, password, role });

		// Hash the password
		const salt = bcryptjs.genSaltSync(10);
		user.password = bcryptjs.hashSync(password, salt);

		await user.save();

		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Error when creating user', error });
	}
};

const userPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, email, ...rest } = req.body;

	if (password) rest.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

	const user = await User.findByIdAndUpdate(id, { ...rest });

	res.status(400).json(user);
};

const userDelete = async (req, res = response) => {
	const { id } = req.params;

	const user = await User.findByIdAndUpdate(id, { status: false });

	res.json({ user });
};

module.exports = { userGet, userPost, userPut, userDelete };
