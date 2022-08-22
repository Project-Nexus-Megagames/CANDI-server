const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const storageSmall = new CloudinaryStorage({
	cloudinary,

	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	},
	params: {
		transformation:  { width: 200, crop: 'scale' },
		folder: 'goblinCity' }

});

const uploadCloudSmall = multer({ storageSmall });

const storageMedium = new CloudinaryStorage({
	cloudinary,

	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	},
	params: {
		transformation:  { width: 200, crop: 'scale' },
		folder: 'goblinCity' }

});

const uploadCloudMedium = multer({ storageMedium });

const storageLarge = new CloudinaryStorage({
	cloudinary,

	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	},
	params: {
		transformation:  { width: 200, crop: 'scale' },
		folder: 'goblinCity' }

});

const uploadCloudLarge = multer({ storageLarge });

const storage = new CloudinaryStorage({
	cloudinary,

	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	},
	params: {
		transformation:  { width: 200, crop: 'scale' },
		folder: 'goblinCity' }

});

const uploadCloud = multer({ storage });

module.exports = { uploadCloudSmall, uploadCloud, uploadCloudMedium, uploadCloudLarge };