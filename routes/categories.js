const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categories');
const { existCategoryById } = require('../helpers');
const { validateJwt, fieldValidations, isAdminRole } = require('../middlewares');

router.get('/', getCategories);

router.get(
	'/:id',
	[
		check('id', 'Id is not valid Mongo ObjectId').isMongoId(),
		check('id').custom(existCategoryById),
		fieldValidations,
	],
	getCategory
);

router.post(
	'/',
	[validateJwt, check('name', 'Name is required').notEmpty(), fieldValidations],
	createCategory
);

router.put(
	'/:id',
	[
		validateJwt,
		check('id', 'Id is not valid Mongo ObjectId').isMongoId(),
		check('id').custom(existCategoryById),
		check('name', 'Name is required').notEmpty(),
		fieldValidations,
	],
	updateCategory
);

router.delete(
	'/:id',
	[
		validateJwt,
		isAdminRole,
		check('id', 'Id is not valid Mongo ObjectId').isMongoId(),
		check('id').custom(existCategoryById),
		fieldValidations,
	],
	deleteCategory
);

module.exports = router;
