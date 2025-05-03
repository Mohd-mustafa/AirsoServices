import jwt from "jsonwebtoken";
 
 const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  console.log("Extracted Token:", token); // Debugging

  if (!token) {
      console.log("No token provided", req.cookies, req.headers.authorization); // Debugging
      return res.status(401).json({ message: "No token provided" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err,user) =>{
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
      });
       } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateToken;