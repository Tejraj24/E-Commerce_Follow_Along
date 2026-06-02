// Import the mongoose library
// Mongoose is a Node.js library used for interacting with a MongoDB database.
const mongoose = require("mongoose"); 

// Define the function to establish a connection to the MongoDB database
const connectDatabase = () => {
    mongoose
    
        // Connect to the database using the URL provided in the environment variables
        .connect(process.env.DB_URL) // No need to specify useNewUrlParser or useUnifiedTopology (handled automatically by mongoose)
        .then((data) => {
            // Log a success message when the connection is successfully established
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            // Log an error message if the connection fails
            console.error(`Database connection failed: ${err.message}`);

            // For development, do not exit the process so the server can start.
            // This allows using mocked responses or testing endpoints that don't require DB access.
            // In production, you should still fail fast and exit the process.
        });
};

// Export the connectDatabase function
// This allows other parts of the application to use this function to establish a database connection
module.exports = connectDatabase;
