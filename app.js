require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 3000;
const { productRouters } = require('./routes/productRoutes');

//! ............ Middleware .......... //
// app.use(cors());
app.use(express.json());
app.use('/api/v1/products', productRouters);

//! ............ App Listenig Function .......... //
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Server Listening on PORT - ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();
