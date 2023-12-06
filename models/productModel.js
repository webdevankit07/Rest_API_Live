const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    featured: { type: Boolean, default: false },
    description: { type: String, required: true },
    price: { type: Number, min: [0, 'Wrong price'], required: true },
    discountPercentage: {
        type: Number,
        min: [0, 'Wrong min discount'],
        max: [50, 'wrong max discount'],
    },
    rating: { type: Number, min: [0, 'Wrong rating'], max: [5, 'wrong rating'], default: 4.9 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    images: [String],
});

exports.Product = mongoose.model('Product', productSchema);
