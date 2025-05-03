import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';  // Import the pool from db.js

dotenv.config();

const app = express.Router();
  
// Middleware to parse JSON
app.use(express.json());

// POST /api/contactus - Insert form data into the database
app.post('/contactus', async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO contactus (name, email, phoneNumber, message) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [name, email, phoneNumber, message]);

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      formId: result.insertId,
    });
  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/contactus - Retrieve all contact form submissions
app.get('/contacts', async (req, res) => {
  try {
    const query = 'SELECT * FROM contactus';
    const [results] = await pool.execute(query);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/contactus/:id - Retrieve a specific contact form entry by ID
app.get('/contactus/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM contactus WHERE id = ?';
    const [result] = await pool.execute(query, [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Form entry not found' });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/contactus/:id - Update contact form data by ID
app.put('/contactus/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber, message } = req.body;

  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = 'UPDATE contactus SET name = ?, email = ?, phone_number = ?, message = ? WHERE id = ?';
    const [result] = await pool.execute(query, [name, email, phoneNumber, message, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Form entry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Form updated successfully',
    });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/contactus/:id - Delete a specific contact form entry by ID
app.delete('/contactus/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM contactus WHERE id = ?';
    const [result] = await pool.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Form entry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Form entry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 
export default app;

