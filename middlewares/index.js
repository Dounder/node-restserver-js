const fieldValidations = require('../middlewares/field-validations');
const validateJwt = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');

module.exports = { ...fieldValidations, ...validateJwt, ...validateRole };
