const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "notFoundBookingSystem";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  };

module.exports = verifyToken;