const Role = require('../models/Role');
const User = require('../models/User');

const isValidRole = async (name = '') => {
	if (!(await Role.findOne({ name }))) throw new Error(`Role ${name} is not valid`);
};

const emailExists = async (email = '') => {
	if (await User.findOne({ email })) throw new Error(`Email ${email} already registered`);
};

const existUserById = async (id) => {
	if (!(await User.findOne({ _id: id, status: true }))) throw new Error(`User with id ${id} not found`);
};

module.exports = { isValidRole, emailExists, existUserById };
