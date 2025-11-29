const mongoose = require('mongoose');
require('dotenv').config({ path: '../backend/.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Get all products
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    
    console.log('Total products in database:', products.length);
    
    // Filter men's products
    const menProducts = products.filter(p => p.category && p.category.toLowerCase() === 'men');
    console.log('\nMen\'s products:', menProducts.length);
    
    if (menProducts.length > 0) {
      console.log('\nSample men\'s product:');
      console.log({
        name: menProducts[0].name,
        category: menProducts[0].category,
        price: menProducts[0].price,
        stock: menProducts[0].stock,
        hasImages: menProducts[0].images && menProducts[0].images.length > 0
      });
    }
    
    // Check if the products collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const productCollectionExists = collections.some(c => c.name === 'products');
    
    console.log('\nCollections in database:');
    console.log(collections.map(c => c.name));
    
    if (!productCollectionExists) {
      console.log('\nError: The products collection does not exist in the database.');
    }
    
  } catch (error) {
    console.error('Error checking products:', error);
  } finally {
    mongoose.connection.close();
  }
});
