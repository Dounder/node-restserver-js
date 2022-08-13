const { Router } = require('express');
const { check } = require('express-validator');

const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/products');
const { existProduct, existCategoryById } = require('../helpers');
const { fieldValidations, validateJwt, isAdminRole } = require('../middlewares');

const router = Router();

router.get('/', getProducts);

router.get(
	'/:id',
	[
		check('id', 'Id is not valid Mongo ObjectId').isMongoId(),
		check('id').custom(existProduct),
		fieldValidations,
	],
	getProduct
);

router.post(
	'/',
	[
		validateJwt,
		check('name', 'Name is required').notEmpty(),
		check('category', 'Is not valid Mongo id').isMongoId(),
		check('category').custom(existCategoryById),
		fieldValidations,
	],
	createProduct
);

router.put(
	'/:id',
	[
		validateJwt,
		check('id', 'Id is not valid Mongo ObjectId').isMongoId(),
		check('id').custom(existProduct),
		fieldValidations,
	],
	updateProduct
);

router.delete(
	'/:id',
	[
		validateJwt,
		isAdminRole,
		check('id', 'Id is not valid Mongo ObjectId').isMongoId(),
		check('id').custom(existProduct),
		fieldValidations,
	],
	deleteProduct
);

module.exports = router;
