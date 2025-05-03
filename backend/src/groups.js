import express from 'express';
import db from './db.js';
import upload from './uploadMiddleware.js';

const app = express.Router();
app.use(express.json()); 

app.post("/groups", upload.single("image"), async (req, res) => {
    try {
      const { group_name, days, flight, starting_price, hotel_category, makkah_nights, madina_nights } = req.body;
      const image_url = req.file ? req.file.location : null;
  
      if (!group_name || !days || !flight || !starting_price || !hotel_category || !image_url || !makkah_nights || !madina_nights) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if the group already exists using promise-based approach
      const checkSql = `SELECT * FROM umrah_groups WHERE group_name = ?`;
      const [checkResult] = await db.execute(checkSql, [group_name]);
  
      if (checkResult.length > 0) {
        return res.status(400).json({ message: "Group already exists!" });
      }
  
      // Insert new group using promise-based approach
      const insertSql = `INSERT INTO umrah_groups (group_name, days, flight, starting_price, hotel_category, makkah_nights, madina_nights, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [group_name, days, flight, starting_price, hotel_category, makkah_nights, madina_nights, image_url];
      const [insertResult] = await db.execute(insertSql, values);
  
      res.status(201).json({ message: "Group added successfully!", groupId: insertResult.insertId });
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
// GET route to fetch all groups
// GET route to fetch all groups
app.get('/groups', async (req, res) => {
    try {
      const query = 'SELECT * FROM umrah_groups'; // Query to fetch all groups
      // Use the promise-based query method
      const [results] = await db.execute(query);
      res.status(200).json(results); // Send the list of groups
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: 'Database error' });
    }
  });
    
  // GET route to fetch a single group by group_id
 // DELETE route to remove a group by ID
// GET route to fetch a specific group by ID
app.get('/groups/:group_id', async (req, res) => {
    const { group_id } = req.params;
    try {
      const query = 'SELECT * FROM umrah_groups WHERE id = ?';  // Changed 'group_id' to 'id'
      db.query(query, [group_id], (err, results) => {
        if (err) {
          console.error("❌ SQL Error:", err);
          return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json(results[0]); // Send the group data
      });
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // DELETE route to remove a group by ID
  // DELETE route to remove a group by ID
  app.delete('/groups/:id', async (req, res) => {
    const { id } = req.params; // Extract the 'id' from the URL parameter
    
    try {
      // Step 1: Check if the group exists
      const checkSql = `SELECT * FROM umrah_groups WHERE id = ?`;
      const [checkResult] = await db.execute(checkSql, [id]);
  
      if (checkResult.length === 0) {
        return res.status(404).json({ message: "Group not found" }); // If no group found, return 404
      }
  
      // Step 2: Proceed to delete the group
      const deleteSql = `DELETE FROM umrah_groups WHERE id = ?`;
      const [deleteResult] = await db.execute(deleteSql, [id]);
  
      if (deleteResult.affectedRows === 0) {
        return res.status(400).json({ message: "Failed to delete the group" }); // If deletion fails, return an error
      }
  
      // Step 3: Send a success response
      res.status(200).json({ message: "Group deleted successfully" });
  
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: "Server error" }); // If an error occurs, return a 500 response
    }
  });
  app.put('/groups/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;  // Extract group ID from the URL parameter
    const { group_name, days, flight, starting_price, hotel_category, makkah_nights, madina_nights } = req.body;
    const image_url = req.file ? req.file.location : null; // Check if an image is provided
  
    try {
      // Step 1: Check if the group exists
      const checkSql = `SELECT * FROM umrah_groups WHERE id = ?`;
      const [checkResult] = await db.execute(checkSql, [id]);
  
      if (checkResult.length === 0) {
        return res.status(404).json({ message: "Group not found" });  // Return 404 if the group does not exist
      }
  
      // Step 2: Prepare values for update
      const values = [
        group_name || checkResult[0].group_name, // If new value provided, use it; otherwise, keep old value
        days || checkResult[0].days,
        flight || checkResult[0].flight,
        starting_price || checkResult[0].starting_price,
        hotel_category || checkResult[0].hotel_category,
        makkah_nights || checkResult[0].makkah_nights,
        madina_nights || checkResult[0].madina_nights,
        image_url || checkResult[0].image_url,  // Use new image URL if provided
        id
      ];
  
      // Step 3: Update the group details
      const updateSql = `UPDATE umrah_groups 
                         SET group_name = ?, days = ?, flight = ?, starting_price = ?, hotel_category = ?, 
                             makkah_nights = ?, madina_nights = ?, image_url = ? 
                         WHERE id = ?`;
  
      const [updateResult] = await db.execute(updateSql, values);
  
      if (updateResult.affectedRows === 0) {
        return res.status(400).json({ message: "Failed to update the group" });
      }
  
      // Step 4: Return success response
      res.status(200).json({ message: "Group updated successfully" });
  
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
    

export default app;
