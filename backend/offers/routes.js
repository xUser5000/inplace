const offersRouter = require("express").Router();
const joi = require("joi");

const { defineRoute } = require("../core/define_route");
const { NotFoundError } = require("../core/errors");
const { Offer, OFFER_TYPE_ENUM } = require("./models");
const { upload } = require("./../core/middlewares");
const { preprocessBuffer, uploadBuffer } = require("../core/images");

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
	description: joi.string().max(50).required(),
	longitude: joi.number().min(-180).max(180).required(),
	latitude: joi.number().min(-90).max(90).required(),
	area: joi.number().required(),
	offerType: joi
		.string()
		.valid(...OFFER_TYPE_ENUM)
		.required(),
	offerPrice: joi.number().required(),
	isFurnished: joi.boolean(),
	floorNumber: joi.number().integer(),
	roomCount: joi.number().integer(),
	bathroomCount: joi.number().integer(),
	bedCount: joi.number().integer(),
	appliances: joi.array().items(joi.string()).default([]),
	notes: joi.string()
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
		let imageUrls = [];
		if (req.files && req.files.length > 0) {
			const imageUploadTasks = req.files.map(async (file) => {
				file.originalname = Date.now() + "__" + file.originalname;
				const preProcessedBuffer = await preprocessBuffer(file.buffer);
				const result = await uploadBuffer(preProcessedBuffer);
				return result.secure_url;
			});

			imageUrls = await Promise.all(imageUploadTasks);
		}

		const offer = await Offer.create({
			userId: req.userId,
			images: imageUrls,
			...req.body
		});

		res.json(offer);
	}
});

module.exports = { offersRouter };
