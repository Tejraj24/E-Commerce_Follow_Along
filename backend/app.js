const express = require("express");
const app = express(); 
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path=require('path')

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Configuration for environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
    // Load environment variables from the .env file if the environment is not production
    require("dotenv").config({
        path: "config/.env",
    });
};
// Serve static files for uploads and products
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', express.static(path.join(__dirname, 'products')));

// Import Routes (moved to dedicated routes folder)
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
app.use('/api/v2/user', userRoutes);
app.use('/api/v2/product', productRoutes);
app.use('/api/v2/orders', ordersRoutes);
app.use(ErrorHandler);
module.exports= app;