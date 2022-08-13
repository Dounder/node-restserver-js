const { response, request } = require('express');
const { Category } = require('../models');

const getCategories = async (req = request, res = response) => {
	try {
		const { from = 0, limit = 5 } = req.query;
		const filter = { status: true };

		const [total, categories] = await Promise.all([
			Category.countDocuments(filter),
			Category.find(filter).limit(Number(limit)).skip(Number(from)).populate('user', 'name'),
		]);

		res.json({ total, categories });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error getting categories' });
	}
};

const getCategory = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id).populate('user', 'name');

		if (!category) return res.status(404).json({ msg: 'Category not found' });

		res.json({ category });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error getting category' });
	}
};

const createCategory = async (req = request, res = response) => {
	try {
		const name = req.body.name.toUpperCase();

		if (await Category.findOne({ name }))
			return res.status(400).json({ msg: `Category ${name} already exists` });

		const category = new Category({ name, user: req.user._id });
		await category.save();

		res.status(201).json({ category });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error creating category' });
	}
};

const updateCategory = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const name = req.body.name.toUpperCase();

		if (await Category.findOne({ name }))
			return res.status(400).json({ msg: `Category ${name} already exists` });

		const category = await Category.findByIdAndUpdate(id, { name, user: req.user._id }, { new: true });

		res.json({ msg: 'Category updated', category });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error updating category' });
	}
};

const deleteCategory = async (req = request, res = response) => {
	try {
		const { id } = req.params;

		const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

		res.json({ msg: 'Category deleted', category });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error deleting category' });
	}
};

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
