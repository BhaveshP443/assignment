const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { domainToASCII, domainToUnicode } = require('url'); // Import domainToASCII and domainToUnicode from the url module
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const authorRoutes = require('./routes/authorRoutes');
const countRoutes = require('./routes/countRoutes');

const app = express(); 
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Library_DB' //You may change the database name
  
});
// console.log("mongodb connected")
const db = mongoose.connection;


db.on('connected', () => {
  console.log('MongoDB connected successfully');
});

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Example Punycode operations using url module
const unicodeDomain = domainToUnicode('xn--example-9h2c.com');
const asciiDomain = domainToASCII('example.com');

console.log(`Unicode Domain: ${unicodeDomain}`);
console.log(`ASCII Domain: ${asciiDomain}`);
app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System!');
});

app.use('/api/books', bookRoutes);
app.use('/api/borrowers', borrowerRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/counts', countRoutes);

// Start the server
const PORT = `${process.env.PORT}` || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
