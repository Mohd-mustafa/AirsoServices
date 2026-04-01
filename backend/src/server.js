import express from 'express';
import pool from './db.js';  // Assuming db.js handles your MySQL connection
import visaRoutes from './visa.js';
import feedback from './feedback.js';
import hotel from './hotel.js';
import login from './login.js';
import groups from './groups.js'
import cors from "cors";
import visaTypeRoutes from './visaTypes.js'
import formController from './formController.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;
app.use(express.json());

 app.use(cors({
  origin: "http://localhost:3000", // Allow frontend
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow headers
  credentials:true
}));

app.use('/api', visaRoutes);
app.use("/api",feedback)
app.use('/api',hotel)
app.use('/auth',login);
app.use('/api',groups)
app.use('/api',visaTypeRoutes);
app.use('/api',formController);

  
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
