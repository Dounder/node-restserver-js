const { Schema, model } = require('mongoose');

const CategorySchema = Schema(
	{
		name: { type: String, required: [true, 'Name is required'], unique: true },
		status: { type: Boolean, default: true, required: [true, 'Status is required'] },
		//! Relation with other models (users)
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'User is required'],
		},
	},
	{ collection: 'categories' }
);

CategorySchema.methods.toJSON = function () {
	const { __v, _id, status, ...category } = this.toObject();
	return { ...category, uid: _id };
};

module.exports = model('Category', CategorySchema);
