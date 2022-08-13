const dbValidators = require('./db-validators');
const googleVerify = require('./verify-google');
const { generateToken } = require('./generate-jwt');

module.exports = {
	...dbValidators,
	...googleVerify,
	generateToken,
};
