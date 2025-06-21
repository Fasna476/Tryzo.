const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select('-password');
      console.log("token",req.user)
      next();
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      res.status(401).json({ message: 'Invalid token' });
    }
    
  } else {
    console.warn("No token provided");
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

module.exports = authMiddleware;

// const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     console.log("token",token)
//     if (!token) return res.status(401).json({ message: "Not authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) return res.status(401).json({ message: "User not found" });

//     req.user = user; // Add user to request
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = protect ;
