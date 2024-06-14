const offersRouter = require("express").Router();
const joi = require("joi");
const { defineRoute } = require("../core/define_route");
const { NotFoundError } = require("../core/errors");
const { Offer } = require("./models");
const { upload, editImg } = require("./../core/middlewares");
const cloudinary = require("./../core/cloudinary");

const FEATURE = "offers";

defineRoute({
	router: offersRouter,
	feature: FEATURE,
	path: "/offers",
	method: "get",
	description: "list all offers",
	handler: async (req, res) => {
		const offers = await Offer.findAll();
		res.json(offers);
	}
});

defineRoute({
	router: offersRouter,
	feature: FEATURE,
	path: "/offer/:id",
	method: "get",
	description: "get an offer by id",
	handler: async (req, res) => {
		const offer = await Offer.findByPk(req.params.id);
		if (!offer) throw new NotFoundError("Offer Not Found!");
		res.json(offer);
	}
});

const addOfferSchema = joi.object({
	longitude: joi.number().min(-180).max(180).required(),
	latitude: joi.number().min(-90).max(90).required(),
	images: joi.array().items(joi.string().uri()).min(1).required(),
	isFurnished: joi.boolean().required(),
	forRent: joi.boolean().required(),
	forSale: joi.boolean().required(),
	rentCost: joi.number().required(),
	saleCost: joi.number().required(),
	capacity: joi.number().integer().required(),
	floorNumber: joi.number().integer().required(),
	roomCount: joi.number().integer().required(),
	bathroomCount: joi.number().integer().required(),
	bedCount: joi.number().integer().required(),
	area: joi.number().required(),
	appliances: joi.array().items(joi.string()),
	notes: joi.string(),
	description: joi.string().max(50).required()
});
defineRoute({
	router: offersRouter,
	feature: FEATURE,
	path: "/offer",
	method: "post",
	description: "create a new offer",
	inputSchema: addOfferSchema,
	middlewares: [upload.array("images")],
	handler: async (req, res) => {
		const offer = await Offer.create(req.body);
		res.json(offer);
	}
});

defineRoute({
	router: offersRouter,
	feature: FEATURE,
	path: "/offer/:id",
	method: "patch",
	description: "upload offer images",
	middlewares: [upload.array("images"), editImg],
	handler: async (req, res) => {
		const offer = await Offer.findByPk(req.params.id);
		// Access the uploaded files through req.files
		const images = req.files;
		let imgsUrls = [];

		images.forEach((file) => {
			// Upload image buffer to Cloudinary
			const imagebuffer = file.buffer;
			cloudinary.uploader
				.upload_stream({ resource_type: "image" }, (error, result) => {
					if (error) {
						return new NotFoundError("not found!");
					}
					// Image uploaded successfully to Cloudinary

					console.log("Uploaded to Cloudinary:", result.url);
				})
				.end(imagebuffer);
		});

		res.json(offer);
	}
});
module.exports = { offersRouter };
