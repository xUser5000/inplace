const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const preprocessBuffer = async (buffer) => {
	return await sharp(buffer)
		.resize(1080, 680)
		.toFormat("jpeg")
		.jpeg({ quality: 80 })
		.toBuffer();
};

const uploadBuffer = (buffer) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream({ resource_type: "image" }, (error, result) => {
				if (error) return reject(error);
				resolve(result);
			})
			.end(buffer);
	});
};

module.exports = { preprocessBuffer, uploadBuffer };
