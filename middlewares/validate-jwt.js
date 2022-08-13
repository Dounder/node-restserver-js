const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateJwt = async (req = request, res, next) => {
	const token = req.header('x-token'); // x-token is the name of the header that we set in the frontend

	if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

	try {
		const { uid } = jwt.verify(token, process.env.JWT_KEY);

		const user = await User.findById(uid);
		if (!user) return res.status(404).json({ msg: 'Invalid token' });
		if (!user.status) return res.status(401).json({ msg: 'Invalid token' });

		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};

module.exports = { validateJwt };
