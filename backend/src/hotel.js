 import dotenv from 'dotenv';
import upload from './uploadMiddleware.js';
import express from 'express';
 import pool from './db.js'; 

dotenv.config();

const app = express.Router(); 
// Middleware to parse JSON
app.use(express.json());

app.post('/hotels', upload.single('image'), async (req, res) => {
  const { name, location, price, rating } = req.body;
  const image = req.file ? req.file.location : null; // Ensure the image URL is fetched correctly

  console.log('Request Body:', req.body); // For debugging
  console.log('File Info:', req.file); // For debugging

  const query = 'INSERT INTO hotels (name, location, price, rating, image) VALUES (?, ?, ?, ?, ?)';
  
  try {
    const [result] = await pool.execute(query, [name, location, price, rating, image]);

    console.log('Inserted hotel ID:', result.insertId);

    // Send a response after inserting the hotel
    return res.status(201).json({
      message: 'Hotel added successfully',
      hotelId: result.insertId,
      imageUrl: image, // Optional, to return the uploaded image URL
    });
  } catch (err) {
    console.error('DB Error:', err);
    return res.status(500).json({ message: 'Error adding hotel' });
  }
});

app.get('/hotels', async (req, res) => {
  try {
    // Extract query parameters
    const { sortBy = 'name', sortOrder = 'ASC', location, rating } = req.query;
    // Build the SQL query with optional filters and sorting
    let query = 'SELECT * FROM hotels WHERE 1=1'; // Base query
    // Add filtering conditions
    if (location) {
      query += ' AND location = ?';
    }
    if (rating) {
      query += ' AND rating >= ?';
    }
    // Add sorting
    query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    // Prepare query parameters
    const params = [];
    if (location) params.push(location);
    if (rating) params.push(rating);
    // Use query() method to run the query and get results
    const [results] = await pool.execute(query, params);
    res.json(results); // Return the results
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching hotels' });
  }
});

app.get('/hotels/:id', async (req, res) => {
  try {
    // Extract the hotel ID from the request parameters
    const { id } = req.params;

    // Build the SQL query to fetch the hotel by ID
    const query = 'SELECT * FROM hotels WHERE id = ?';

    // Execute the query with the hotel ID as a parameter
    const [results] = await pool.execute(query, [id]);

    // If no hotel is found, return a 404 error
    if (results.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Return the hotel data
    res.json(results[0]); // Return the first result since ID should be unique
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching hotel by ID' });
  }
});

// Route to update a hotel
app.put('/hotels/:hotelId', upload.single('image'), async (req, res) => {
  const { hotelId } = req.params;
  const { name, location, price, rating } = req.body;
  const image = req.file ? req.file.location : null;

  const query = 'UPDATE hotels SET name = ?, location = ?, price = ?, rating = ?, image = ? WHERE id = ?';
  
  try {
    const [result] = await pool.execute(query, [name, location, price, rating, image, hotelId]);

    res.json({ message: 'Hotel updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating hotel' });
  }
});

// Route to delete a hotel
app.delete('/hotels/:hotelId', async (req, res) => {
  const { hotelId } = req.params;

  const query = 'DELETE FROM hotels WHERE id = ?';
  
  try {
    const [result] = await pool.execute(query, [hotelId]);

    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting hotel' });
  }
});

export default app;
