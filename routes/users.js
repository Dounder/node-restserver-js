const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete } = require('../controllers/users');
const { isValidRole, emailExists, existUserById } = require('../helpers/db-validators');
const { fieldValidations } = require('../middlewares/field-validations');

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
	[check('id', 'Id is not valid').isMongoId(), check('id').custom(existUserById), fieldValidations],
	userDelete
);

module.exports = router;
