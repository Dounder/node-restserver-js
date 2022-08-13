const { Category, Role, User, Product } = require('../models');

const isValidRole = async (name = '') => {
	if (!(await Role.findOne({ name }))) throw new Error(`Role ${name} is not valid`);
};

const emailExists = async (email = '') => {
	if (await User.findOne({ email })) throw new Error(`Email ${email} already registered`);
};

const existUserById = async (id) => {
	if (!(await User.findOne({ _id: id, status: true }))) throw new Error(`User with id ${id} not found`);
};

const existCategoryById = async (id) => {
	if (!(await Category.findOne({ _id: id, status: true })))
		throw new Error(`Category with id ${id} not found`);
};

const existProduct = async (id) => {
	if (!(await Product.findOne({ _id: id, status: true })))
		throw new Error(`Product with id ${id} not found`);
};

module.exports = { isValidRole, emailExists, existUserById, existCategoryById, existProduct };
