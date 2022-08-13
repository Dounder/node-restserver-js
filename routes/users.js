const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { userGet, userPost, userPut, userDelete } = require('../controllers/users');
const { isValidRole, emailExists, existUserById } = require('../helpers/db-validators');
const { fieldValidations, validateJwt, hasRole } = require('../middlewares');

router.get('/', userGet);

router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('password', 'Password is required and must be 6 character length').isLength({ min: 6 }),
		check('email', 'Email is required').isEmail(),
		check('email').custom(emailExists),
		check('role').custom(isValidRole),
		fieldValidations,
	],
	userPost
);

router.put(
	'/:id',
	[
		check('id', 'Id is not valid').isMongoId(),
		check('id').custom(existUserById),
		check('role').custom(isValidRole),
		fieldValidations,
	],
	userPut
);

router.delete(
	'/:id',
	[
		validateJwt,
		hasRole('ADMIN_ROLE'),
		check('id', 'Id is not valid').isMongoId(),
		check('id').custom(existUserById),
		fieldValidations,
	],
	userDelete
);

module.exports = router;
