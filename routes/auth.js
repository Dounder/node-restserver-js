const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const router = Router();

const { fieldValidations } = require('../middlewares/field-validations');

router.post(
	'/login',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		fieldValidations,
	],
	login
);

module.exports = router;
