import express from 'express';
import bodyParser from 'body-parser';
 import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from './db.js'
import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import authenticateToken from "../src/middleWare/authMiddleware.js";
import { readFile } from "fs/promises";
import upload from "../src/uploadMiddleware.js";
  
const app = express.Router();
  
 
// Middleware setup
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow headers
  credentials:true
}));
app.use(bodyParser.json());
app.use(express.json());  // This is necessary to parse JSON bodies
app.use("/protected-route", authenticateToken);
 
// Read and parse the Firebase service account JSON file
const serviceAccount = JSON.parse(
  await readFile(new URL("../firebase-adminsdk.json", import.meta.url))
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    console.log("Decoded User:", decodedToken);

    // Check if user exists
    const checkUserQuery = "SELECT * FROM users WHERE uid = ?";
    const [results] = await db.query(checkUserQuery, [uid]);

    let user;
    if (results.length === 0) {
      // Insert new user
      const insertUserQuery = "INSERT INTO users (uid, name, email, profile_pic, role) VALUES (?, ?, ?, ?, 'user')";
      await db.query(insertUserQuery, [uid, name, email, picture]);

      user = { uid, email, name, profile_pic: picture };
    } else {
      user = results[0];
    }

    // Generate JWT token (1 hour expiry)
    const jwtToken = jwt.sign({ uid, email, name, picture }, JWT_SECRET, { expiresIn: "1h" });

    // Set token in HTTP-Only Secure Cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "Lax", 
      path: "/", // Available to all routes
      maxAge: 3600000, // 1 hour
    });

    console.log("cookie set in backend", jwtToken);

    res.json({
      success: true,
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
});

app.get("/refresh", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token found, please log in!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Issue a new token with updated expiry
    const newToken = jwt.sign(
      { uid: decoded.uid, email: decoded.email, name: decoded.name, picture: decoded.picture },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set new token in HTTP-Only Cookie
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    return res.json({ success: true, message: "Token refreshed" });
  } catch (err) {
    return res.status(401).json({ message: "Token expired, please log in again!" });
  }
});

// Fetch current user
app.get("/current-user", authenticateToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const getUserQuery = "SELECT uid, name, email, profile_pic, role FROM users WHERE uid = ?";
    const [results] = await db.query(getUserQuery, [uid]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user: results[0] });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
  res.json({ success: true, message: "Logout Successfully" });
});

// REST API Endpoints
 
// Group Management: Create, Delete, and Fetch Groups

  
export default app;