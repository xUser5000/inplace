const offersRouter = require("express").Router();
const joi = require("joi");

const { defineRoute } = require("../core/define_route");
const { NotFoundError } = require("../core/errors");
const { Offer } = require("./models");
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
	longitude: joi.number().min(-180).max(180).required(),
	latitude: joi.number().min(-90).max(90).required(),
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
		const imageUrls = [];
		for (const file of req.files) {
			file.originalname = Date.now() + "__" + file.originalname;
			const preProcessedBuffer = await preprocessBuffer(file.buffer);
			const result = await uploadBuffer(preProcessedBuffer);
			imageUrls.push(result.secure_url);
		}

		const offer = await Offer.create({
			...req.body,
			images: imageUrls
		});

		res.json(offer);
	}
});

module.exports = { offersRouter };
