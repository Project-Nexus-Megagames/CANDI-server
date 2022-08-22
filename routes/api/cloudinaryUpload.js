const express = require('express');
const router = express.Router();
const fileUploader = require('../../config/cloudinary.config');

// TODO: add different router.post (/medium, /small)
// and 3 different config files for fileloader middleware
router.post('/', fileUploader.single('file'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	res.json({ secure_url: req.file.path });
});

module.exports = router;