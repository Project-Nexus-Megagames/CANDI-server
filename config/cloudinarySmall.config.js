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
		transformation: [ { if: 'w  > 200' }, { width: 200, crop: 'scale' }, { if: 'end' }],
		folder: 'UrSeason2' }
});

const uploadCloudSmall = multer({ storage });

module.exports = uploadCloudSmall;