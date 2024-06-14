const joi = require("joi");
const multer = require("multer");
const sharp = require("sharp");
const { APIError, ValidationError } = require("./errors");

const errorHandler = () => {
	return (err, req, res, next) => {
		if (err instanceof APIError) {
			return res.status(err.code).json({
				name: err.name,
				message: err.message,
				details: err.details
			});
		}

		console.error(err);
		res.sendStatus(500);
	};
};

const schemaValidator = (schema) => {
	return (req, res, next) => {
		const result = schema.validate(req.body, { abortEarly: false });
		if (result.error) {
			const errors = result.error.details.reduce((acc, error) => {
				console.log(error);
				const field = error.context.label;
				const message = error.message;

				if (!acc[field]) {
					acc[field] = [];
				}

				acc[field].push(message);
				return acc;
			}, {});

			throw new ValidationError("Bad request body", errors);
		}

		next();
	};
};

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "/home/ashraf22/inplace/backend/images");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + "__" + file.originalname);
// 	}
// });

const storage = multer.memoryStorage();

const editImg = (req, res, next) => {
	const imgs = req.files;
	imgs.forEach((file) => {
		file.originalname = Date.now() + "__" + file.originalname;
		sharp(file.buffer)
			.resize(1080, 680)
			.toFormat("jpeg")
			.jpeg({ quality: 80 });
	});
	next();
};

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else throw new ValidationError("Only PNG and JPEG files are allowed");
};

const upload = multer({
	storage: storage,
	fileFilter: multerFilter,
	limits: {
		fileSize: 1024 * 1024 * 5
	}
});

module.exports = { errorHandler, schemaValidator, upload, editImg };
