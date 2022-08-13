const { response, request } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
	try {
		const { from = 0, limit = 5 } = req.query;
		const filter = { status: true };

		const [total, products] = await Promise.all([
			Product.countDocuments(filter),
			Product.find(filter).limit(Number(limit)).skip(Number(from)).populate('user category', 'name'),
		]);

		res.json({ total, products });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error getting products' });
	}
};

const getProduct = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).populate('user category', 'name');

		res.json({ product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error getting product' });
	}
};

const createProduct = async (req = request, res = response) => {
	try {
		const { status, user, ...body } = req.body;

		if (await Product.findOne({ name: body.name.toUpperCase() }))
			return res.status(400).json({ msg: `Product ${body.name} already exists` });

		const product = new Product({ ...body, name: body.name.toUpperCase(), user: req.user._id });
		await product.save();

		res.status(201).json({ msg: 'Product created', product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error creating product' });
	}
};

const updateProduct = async (req = request, res = response) => {
	try {
		const { id } = req.params;
		const { status, user, ...body } = req.body;

		if (body.name) body.name = body.name.toUpperCase();

		const product = await Product.findByIdAndUpdate(id, { ...body, user: req.user._id }, { new: true });

		res.json({ msg: 'Product updated', product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error updating product' });
	}
};

const deleteProduct = async (req = request, res = response) => {
	try {
		const { id } = req.params;

		const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

		res.json({ msg: 'Product deleted', product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error deleting product' });
	}
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
