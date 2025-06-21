const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const tryonController = require('../controllers/tryonController');



// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/user_images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/tryon
router.post('/', upload.single('userImage'), tryonController.generateTryOn);

module.exports = router;
