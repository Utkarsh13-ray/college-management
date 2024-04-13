// controllers/assignmentsController.js

const multer = require('multer');

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage }).single('assignment');

// Controller function to handle file upload
const uploadAssignment = (req, res) => {
  // Handle the file upload using Multer middleware
  console.log("aa rha hai");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      console.error('Multer error:', err);
      return res.status(500).json({ success: false, message: 'An error occurred during file upload.' });
    } else if (err) {
      // Other error occurred
      console.error('Unknown error:', err);
      return res.status(500).json({ success: false, message: 'An unknown error occurred.', error: err });
    }
    
    // File uploaded successfully
    res.status(200).json({ success: true, message: 'File uploaded successfully' });
  });
};

module.exports = {
  uploadAssignment
};
