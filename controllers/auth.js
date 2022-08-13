const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		// Verfiying if the user is registered
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'Email or password are not valid.' });

		// Verifying if the user is active
		if (!user.status) return res.status(400).json({ msg: 'Email or password are not valid.' });

		// Verifying if the password is correct
		if (!bcrypt.compareSync(password, user.password))
			return res.status(400).json({ msg: 'Email or password are not valid.' });

		// Generating the token
		const token = await generateToken(user.id);

		res.json({ msg: 'Login ok', token, user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Talk to the administrator' });
	}
};

module.exports = { login };
