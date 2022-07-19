const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: 'df8lwfbar',
	api_key: '683454824876857',
	api_secret: 'babAGl2HyVe3461iY05PiEcHcqQ'
});


const storage = new CloudinaryStorage({
	cloudinary,
	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;