const { request, response } = require('express');
const { isValidObjectId } = require('mongoose');
const { User, Category, Product } = require('../models');

const collectionsPermitted = ['users', 'categories', 'products', 'roles'];

const searchUsers = async (term = '', res = response) => {
	if (isValidObjectId(term)) {
		const user = await User.findById(term);
		return res.json({ total: user ? 1 : 0, results: user ? [user] : [] });
	}
	// Search by name or email insensitively
	const [results, total] = await Promise.all([
		User.find({
			$or: [{ name: { $regex: term, $options: 'i' } }, { email: { $regex: term, $options: 'i' } }],
			$and: [{ status: true }],
		}),
		User.count({
			$or: [{ name: { $regex: term, $options: 'i' } }, { email: { $regex: term, $options: 'i' } }],
			$and: [{ status: true }],
		}),
	]);
	return res.json({ total, results });
};

const searchCategories = async (term = '', res = response) => {
	if (isValidObjectId(term)) {
		const [results, total] = await Promise.all([
			Category.find({ $or: [{ user: term }, { _id: term }], $and: [{ status: true }] }),
			Category.count({ $or: [{ user: term }, { _id: term }], $and: [{ status: true }] }),
		]);
		return res.json({ total, results });
	}

	const [results, total] = await Promise.all([
		Category.find({ name: { $regex: term, $options: 'i' }, status: true }),
		Category.count({ name: { $regex: term, $options: 'i' }, status: true }),
	]);

	return res.json({ total, results });
};

const searchProducts = async (term = '', res = response) => {
	if (isValidObjectId(term)) {
		const [results, total] = await Promise.all([
			Product.find({
				$or: [{ _id: term }, { user: term }, { category: term }],
				$and: [{ status: true }],
			}),
			Product.count({
				$or: [{ _id: term }, { user: term }, { category: term }],
				$and: [{ status: true }],
			}),
		]);
		return res.json({ total, results });
	}

	if (!isNaN(term)) {
		const [results, total] = await Promise.all([
			Product.find({ $or: [{ price: term }], $and: [{ status: true }] }),
			Product.count({ $or: [{ price: term }], $and: [{ status: true }] }),
		]);
		return res.json({ total, results });
	}

	const [results, total] = await Promise.all([
		Product.find({
			$or: [
				{ name: { $regex: term, $options: 'i' } },
				{ description: { $regex: term, $options: 'i' } },
			],
			$and: [{ status: true }],
		}),
		Product.count({
			$or: [
				{ name: { $regex: term, $options: 'i' } },
				{ description: { $regex: term, $options: 'i' } },
			],
			$and: [{ status: true }],
		}),
	]);

	return res.json({ total, results });
};

const search = async (req = request, res = response) => {
	try {
		const { collection, term } = req.params;

		if (!collectionsPermitted.includes(collection))
			return res.status(400).json({
				message: `The collection is not permitted, only permitted: ${collectionsPermitted}`,
			});

		switch (collection) {
			case 'users':
				return await searchUsers(term, res);

			case 'categories':
				return await searchCategories(term, res);

			case 'products':
				return await searchProducts(term, res);

			default:
				return res.status(500).json({ message: `Search ${collection} not implemented` });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Error when searching, contact administrator...' });
	}
};

module.exports = { search };
