require('dotenv').config();
const connectDB = require('./db/connect');
const { Product } = require('./model/productModel');
const products = require('./products.json');

const start = async () => {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(products);
    console.log('success');
};
start();
