const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
	cloudinary,

	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	},
	params: {
		transformation: [ { if: 'w  > 900' }, { width: 900, crop: 'scale' }, { if: 'end' }],
		folder: 'godwar2' }
});

const uploadCloudLarge = multer({ storage });

module.exports = uploadCloudLarge;