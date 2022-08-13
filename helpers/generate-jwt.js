const jwt = require('jsonwebtoken');

const generateToken = (uid = '') =>
	new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '4h' }, (err, token) => {
			if (err) {
				console.log(err);
				reject("couldn't generate token");
			}
			resolve(token);
		});
	});

module.exports = { generateToken };
