const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleLogin } = require('../controllers/auth');
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

router.post(
	'/google',
	[check('id_token', 'Google token is required').notEmpty(), fieldValidations],
	googleLogin
);

module.exports = router;
