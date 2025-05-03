import express from 'express';
import db from './db.js';

const router = express.Router();
router.use(express.json());  // This is necessary to parse JSON bodies

// Route to get all visas with types
router.get('/visas', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        v.id AS visaId, v.visa_name, v.country, v.price, v.processing_time AS visa_processing_time,
        v.approval_rate, v.title,
        t.id AS typeId, t.processing_time AS type_processing_time, t.stay_period, t.validity,
        t.visa_category, t.entry, t.fees
      FROM visa v
      LEFT JOIN types_of_visa t ON v.id = t.visa_id
    `);
    const visas = groupVisasWithTypes(rows);
    res.json(visas);
  } catch (err) {
    console.error('Error fetching visas:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Helper function to group data into a nested structure
const groupVisasWithTypes = (rows) => {
  const visas = [];

  rows.forEach(row => {
    let visa = visas.find(v => v.id === row.visaId);

    if (!visa) {
      visa = {
        id: row.visaId,
        visa_name: row.visa_name,
        country: row.country,
        price: row.price,
        processing_time: row.visa_processing_time,
        approval_rate: row.approval_rate,
        title: row.title,
        types_of_visa: []
      };
      visas.push(visa);
    }

    if (row.typeId) {
      visa.types_of_visa.push({
        id: row.typeId,
        processing_time: row.type_processing_time,
        stay_period: row.stay_period,
        validity: row.validity,
        visa_category: row.visa_category,
        entry: row.entry,
        fees: row.fees
      });
    }
  });

  return visas;
};

router.get('/visas/country/:countryName', async (req, res) => {
  try {
    const { countryName } = req.params;

    const [rows] = await db.query(`
      SELECT 
        v.id AS visaId, v.visa_name, v.country, v.price, v.processing_time AS visa_processing_time,
        v.approval_rate, v.title,
        t.id AS typeId, t.processing_time AS type_processing_time, t.stay_period, t.validity,
        t.visa_category, t.entry, t.fees
      FROM visa v
      LEFT JOIN types_of_visa t ON v.id = t.visa_id
      WHERE v.country = ?
    `, [countryName]);

    const visas = groupVisasWithTypes(rows);
    res.json(visas);

  } catch (err) {
    console.error('Error fetching visas by country:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to add a new visa
router.post('/visa', async (req, res) => {
  const { visa_name, country, price, processing_time, approval_rate, title } = req.body;

  // Basic validation
  if (!visa_name || !country || !price || !processing_time || !approval_rate || !title) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the country already exists in the visa table
    const [existingVisa] = await db.query(
      'SELECT * FROM visa WHERE country = ?',
      [country]
    );

    if (existingVisa.length > 0) {
      return res.status(409).json({ message: `Visa entry for ${country} already exists` });
    }

    // If not, insert the new visa entry
    const [result] = await db.query(
      `INSERT INTO visa (visa_name, country, price, processing_time, approval_rate, title) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [visa_name, country, price, processing_time, approval_rate, title]
    );

    res.status(201).json({ message: 'Visa added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding visa:', err);
    res.status(500).json({ error: 'Failed to add visa' });
  }
});

// Route to add a new type of visa
 

router.put('/visa/:id', async (req, res) => {
    const { id } = req.params;
    const { visa_name, country, price, processing_time, approval_rate, title } = req.body;
  
    // Basic validation
    if (!visa_name || !country || !price || !processing_time || !approval_rate || !title) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const [result] = await db.query(`
        UPDATE visa
        SET visa_name = ?, country = ?, price = ?, processing_time = ?, approval_rate = ?, title = ?
        WHERE id = ?`,
        [visa_name, country, price, processing_time, approval_rate, title, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Visa not found' });
      }
  
      res.json({ message: 'Visa updated successfully' });
    } catch (err) {
      console.error('Error updating visa:', err);
      res.status(500).json({ error: 'Failed to update visa' });
    }
  });

  router.delete('/visa/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await db.query(`
        DELETE FROM visa WHERE id = ?`, 
        [id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Visa not found' });
      }
  
      res.json({ message: 'Visa deleted successfully' });
    } catch (err) {
      console.error('Error deleting visa:', err);
      res.status(500).json({ error: 'Failed to delete visa' });
    }
  });
  
  // Route to get a visa by its ID with types
router.get('/visa/:id', async (req, res) => {
    const { id } = req.params;  
    try {
      const [rows] = await db.query(`
        SELECT 
          v.id AS visaId, v.visa_name, v.country, v.price, v.processing_time AS visa_processing_time,
          v.approval_rate, v.title,
          t.id AS typeId, t.processing_time AS type_processing_time, t.stay_period, t.validity,
          t.visa_category, t.entry, t.fees
        FROM visa v
        LEFT JOIN types_of_visa t ON v.id = t.visa_id
        WHERE v.id = ?
      `, [id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Visa not found' });
      }
  
      const visa = groupVisasWithTypes(rows)[0];  // We expect only one visa since we filtered by ID
      res.json(visa);
    } catch (err) {
      console.error('Error fetching visa by ID:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
   

export default router;
