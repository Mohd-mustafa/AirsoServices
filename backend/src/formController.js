import express from 'express';
import db from './db.js';

const router = express.Router();
router.use(express.json());  // This is necessary to parse JSON bodies


router.post('/submit-form', async (req, res) => {
  try {
    const { fullname, phone, email, travelDate, travelers, message } = req.body;

    // ✅ Validation
    if (!fullname || !phone || !travelers || !travelDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ✅ Check duplicate
    const [existingBooking] = await db.execute(
      'SELECT * FROM bookings WHERE fullname = ? AND phone = ? AND travel_date = ?',
      [fullname, phone, travelDate]
    );

    if (existingBooking.length > 0) {
      return res.status(409).json({
        message: 'Booking already exists for this user and date'
      });
    }

    // ✅ Insert
    const [result] = await db.execute(
      `INSERT INTO bookings 
      (fullname, phone, email, travel_date, travelers, message) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [fullname, phone, email, travelDate, travelers, message]
    );

    res.status(201).json({
      message: 'Form submitted successfully ✅',
      bookingId: result.insertId
    });

  } catch (err) {
    console.error('Error processing form:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;