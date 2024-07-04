const joi = require("joi");
const multer = require("multer");
const sharp = require("sharp");
const { APIError, ValidationError } = require("./errors");
const {
	testResultOption,
	addPagingToQueryOptions,
	addSortingToQueryOptions,
	addFilteringToQueryOptions
} = require("./utils");

const errorHandler = () => {
	return (err, req, res, next) => {
		console.log(err);
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

const buildQueryOptionsBasedOnQueryParams = (result_options) => {
	/*
example of result_options object
	{
		model: "user",
		enablePaging: true,
		enableFiltering: true,
		enableSorting: true,
		attributes: {
			search: ["name"],
			sort: ["price"],
			singleValue: ["price", "size"],
			multiValue: ["category"]
		}
	};
*/
	testResultOption(result_options);

	return (req, res, next) => {
		const { enablePaging, enableSorting, enableFiltering, attributes } =
			result_options;
		const queryOptions = {};

		if (enablePaging) addPagingToQueryOptions(req, queryOptions);

		if (enableSorting)
			addSortingToQueryOptions(req, queryOptions, [attributes.sort]);

		if (enableFiltering)
			addFilteringToQueryOptions(req, queryOptions, [
				attributes.singleValue,
				attributes.multiValue,
				attributes.search
			]);

		req.queryOptions = queryOptions;
		next();
	};
};

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image")) {
			cb(null, true);
		} else throw new ValidationError("Only PNG and JPEG files are allowed");
	},
	limits: {
		fileSize: 1024 * 1024 * 5
	}
});

module.exports = {
	errorHandler,
	schemaValidator,
	buildQueryOptionsBasedOnQueryParams,
	upload
};
