const express = require("express");
const { register, login } = require("../controllers/authController.js");
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .select('-password') // exclude password
        // if you're storing order references
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post("/register", register);
router.post("/login", login);


module.exports = router;
