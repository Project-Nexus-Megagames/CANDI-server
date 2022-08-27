const express = require('express');
const router = express.Router();
const uploadCloud = require('../../config/cloudinary.config');
const uploadCloudSmall = require('../../config/cloudinarySmall.config');
const uploadCloudLarge = require('../../config/cloudinaryLarge.config');
const uploadCloudMedium = require('../../config/cloudinaryMedium.config');

router.post('/', uploadCloud.single('file'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	res.json({ secure_url: req.file.path });
	console.log(req.file.path);
});

router.post('/small', uploadCloudSmall.single('file'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	res.json({ secure_url: req.file.path });
});

router.post('/medium', uploadCloudMedium.single('file'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	res.json({ secure_url: req.file.path });
});

router.post('/large', uploadCloudLarge.single('file'), (req, res, next) => {
	console.log('POST LARGE TRIGGERED');
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	res.json({ secure_url: req.file.path });
	console.log(req.file.path);
});

module.exports = router;