const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || process.env.JWT_SECRET,
    (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
      }
      req.user = user; // Attach user info to request
      next();
    }
  );
}

module.exports = authenticateToken;
