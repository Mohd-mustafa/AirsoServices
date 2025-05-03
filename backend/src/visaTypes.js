import express from 'express';
import db from './db.js';

const router = express.Router();
router.use(express.json()); 

router.post('/types-of-visa', async (req, res) => {
  const { processing_time, stay_period, validity, visa_category, entry, fees, visa_id } = req.body;

  // Basic validation
  if (!processing_time || !stay_period || !validity || !visa_category || !entry || !fees || !visa_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the visa_category already exists for the given visa_id
    const [existingType] = await db.query(
      'SELECT * FROM types_of_visa WHERE visa_category = ? AND visa_id = ?',
      [visa_category, visa_id]
    );

    if (existingType.length > 0) {
      return res.status(409).json({ message: `Visa category '${visa_category}' already exists for this visa` });
    }

    // If not, insert the new type of visa
    const [result] = await db.query(
      `INSERT INTO types_of_visa (processing_time, stay_period, validity, visa_category, entry, fees, visa_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [processing_time, stay_period, validity, visa_category, entry, fees, visa_id]
    );

    res.status(201).json({ message: 'Type of visa added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding type of visa:', err);
    res.status(500).json({ error: 'Failed to add type of visa' });
  }
});


// Get all types of visa
router.get('/types-of-visa', async (req, res) => {
    try {
      const [typesOfVisa] = await db.query('SELECT * FROM types_of_visa');
      res.status(200).json(typesOfVisa);
    } catch (err) {
      console.error('Error fetching types of visa:', err);
      res.status(500).json({ error: 'Failed to fetch types of visa' });
    }
  });
  
  // Get a single type of visa by ID
  router.get('/types-of-visa/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [visaType] = await db.query('SELECT * FROM types_of_visa WHERE id = ?', [id]);
  
      if (visaType.length === 0) {
        return res.status(404).json({ message: 'Type of visa not found' });
      }
  
      res.status(200).json(visaType[0]);
    } catch (err) {
      console.error('Error fetching type of visa by ID:', err);
      res.status(500).json({ error: 'Failed to fetch type of visa' });
    }
  });
  

router.put('/types-of-visa/:id', async (req, res) => {
    const { id } = req.params;  // Get the id of the type of visa to be updated
    const { processing_time, stay_period, validity, visa_category, entry, fees, visa_id } = req.body;
  
    if (!processing_time || !stay_period || !validity || !visa_category || !entry || !fees || !visa_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      // Check if the visa_id exists in the visa table
      const [visaCheck] = await db.query('SELECT id FROM visa WHERE id = ?', [visa_id]);
      if (visaCheck.length === 0) {
        return res.status(400).json({ message: 'Invalid visa_id. No such visa exists.' });
      }
  
      // Proceed to update the type of visa
      const [result] = await db.query(`
        UPDATE types_of_visa 
        SET 
          processing_time = ?, 
          stay_period = ?, 
          validity = ?, 
          visa_category = ?, 
          entry = ?, 
          fees = ?, 
          visa_id = ? 
        WHERE id = ?`, 
        [processing_time, stay_period, validity, visa_category, entry, fees, visa_id, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Type of visa not found' });
      }
  
      res.status(200).json({ message: 'Type of visa updated successfully' });
    } catch (err) {
      console.error('Error updating type of visa:', err);
      res.status(500).json({ error: 'Failed to update type of visa' });
    }
  });
  
  // Route to delete a type of visa
router.delete('/api/types-of-visa/:id', async (req, res) => {
    const { id } = req.params; // Extract the type of visa ID from the request parameters
  
    try {
      // Delete the type of visa with the provided ID
      const [result] = await db.query('DELETE FROM types_of_visa WHERE id = ?', [id]);
  
      // If no rows were affected, return a 404 (not found)
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Type of visa not found' });
      }
  
      res.status(200).json({ message: 'Type of visa deleted successfully' });
    } catch (err) {
      console.error('Error deleting type of visa:', err);
      res.status(500).json({ error: 'Failed to delete type of visa' });
    }
  });
  

export default router;
