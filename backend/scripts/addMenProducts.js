const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Base URL of your API
const BASE_URL = 'http://localhost:8000/api/v2/product';

// Sample product data for men's clothing
const menProducts = [
  {
    name: 'Classic White T-Shirt',
    description: 'Premium quality cotton t-shirt for men',
    category: 'Men',
    tags: 'tshirt, casual, cotton',
    price: 29.99,
    stock: 100,
    email: 'admin@example.com',
    image: 'men-tshirt.jpg'
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Comfortable slim fit jeans for men',
    category: 'Men',
    tags: 'jeans, pants, denim',
    price: 59.99,
    stock: 75,
    email: 'admin@example.com',
    image: 'men-jeans.jpg'
  },
  {
    name: 'Casual Button-Down Shirt',
    description: 'Stylish casual shirt for men',
    category: 'Men',
    tags: 'shirt, casual, cotton',
    price: 39.99,
    stock: 60,
    email: 'admin@example.com',
    image: 'men-shirt.jpg'
  },
  {
    name: 'Athletic Shorts',
    description: 'Comfortable athletic shorts for workouts',
    category: 'Men',
    tags: 'shorts, athletic, sportswear',
    price: 34.99,
    stock: 90,
    email: 'admin@example.com',
    image: 'men-shorts.jpg'
  },
  {
    name: 'Leather Belt',
    description: 'Genuine leather belt for men',
    category: 'Men',
    tags: 'belt, accessory, leather',
    price: 24.99,
    stock: 120,
    email: 'admin@example.com',
    image: 'men-belt.jpg'
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes for men',
    category: 'Men',
    tags: 'shoes, running, athletic',
    price: 79.99,
    stock: 50,
    email: 'admin@example.com',
    image: 'men-shoes.jpg'
  },
  {
    name: 'Winter Jacket',
    description: 'Warm winter jacket for cold weather',
    category: 'Men',
    tags: 'jacket, winter, outerwear',
    price: 99.99,
    stock: 40,
    email: 'admin@example.com',
    image: 'men-jacket.jpg'
  },
  {
    name: 'Dress Shirt',
    description: 'Formal dress shirt for men',
    category: 'Men',
    tags: 'shirt, formal, dress',
    price: 49.99,
    stock: 65,
    email: 'admin@example.com',
    image: 'men-dress-shirt.jpg'
  },
  {
    name: 'Cargo Pants',
    description: 'Durable cargo pants with multiple pockets',
    category: 'Men',
    tags: 'pants, cargo, casual',
    price: 54.99,
    stock: 55,
    email: 'admin@example.com',
    image: 'men-cargo-pants.jpg'
  },
  {
    name: 'Baseball Cap',
    description: 'Classic baseball cap for men',
    category: 'Men',
    tags: 'hat, cap, accessory',
    price: 19.99,
    stock: 150,
    email: 'admin@example.com',
    image: 'men-cap.jpg'
  }
];

// Function to add a single product
async function addProduct(product) {
  try {
    // Create product data without the image field
    const productData = { ...product };
    delete productData.image; // Remove image field as we're not uploading images

    const response = await axios.post(`${BASE_URL}/create-product`, productData);

    console.log(`✅ Added: ${product.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error adding ${product.name}:`, error.response?.data?.message || error.message);
    return null;
  }
}

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '..', 'backend', 'public', 'images', 'products');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Please add product images to: ${imagesDir}`);
  console.log('Required image files:');
  const uniqueImages = [...new Set(menProducts.map(p => p.image))];
  uniqueImages.forEach(img => console.log(`- ${img}`));
  process.exit(1);
}

// Add all products
async function addAllProducts() {
  try {
    for (const product of menProducts) {
      await addProduct(product);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('All products added successfully!');
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    // No cleanup needed for local images
  }
}

// Run the script
addAllProducts();
