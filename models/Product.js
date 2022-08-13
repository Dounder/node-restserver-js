const { Schema, model } = require('mongoose');

const ProductSchema = Schema(
	{
		name: { type: String, required: [true, 'Name is required'], unique: true },
		price: { type: Number, default: 0 },
		description: { type: String },
		available: { type: Boolean, default: true },
		status: { type: Boolean, default: true },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
	},
	{ collection: 'products' }
);

ProductSchema.methods.toJSON = function () {
	const { __v, _id, status, ...product } = this.toObject();
	return { ...product, uid: _id };
};

module.exports = model('Product', ProductSchema);
