const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN);
		console.log('DB Connected');
	} catch (error) {
		console.log(error);
		console.error('DB Connection Error, retrying...');
		dbConnection();
		// throw new Error('DB Connection Error');
	}
};

module.exports = { dbConnection };
