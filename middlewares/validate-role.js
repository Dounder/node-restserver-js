const { request, response } = require('express');

const isAdminRole = async (req = request, res = response, next) => {
	if (!req.user) return res.status(500).json({ msg: 'Error when validating token' });

	const { role, name } = req.user;

	if (role !== 'ADMIN_ROLE') return res.status(401).json({ msg: `${name} is not an admin` });

	next();
};

const hasRole =
	(...roles) =>
	(req = request, res = response, next) => {
		if (!req.user) return res.status(500).json({ msg: 'Error when validating token' });

		if (!roles.includes(req.user.role))
			return res
				.status(401)
				.json({ msg: `${req.user.name} does not have the role ${roles.join(' or ')}` });

		next();
	};

module.exports = { isAdminRole, hasRole };
