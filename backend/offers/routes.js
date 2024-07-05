const privateOffersRouter = require("express").Router();
const publicOffersRouter = require("express").Router();
const joi = require("joi");

const { defineRoute } = require("../core/define_route");
const { NotFoundError, InternalServerError } = require("../core/errors");
const { Offer, OFFER_TYPE_ENUM } = require("./models");
const { Like } = require("../likes/models");
const { upload } = require("./../core/middlewares");
const { preprocessBuffer, uploadBuffer } = require("../core/images");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const FEATURE = "offers";

defineRoute({
	router: publicOffersRouter,
	feature: FEATURE,
	path: "/all",
	method: "get",
	description: "list all offers",
	handler: async (req, res) => {
		let offers = await Offer.findAll();
		offers = await Promise.all(
			offers.map(async (offer) => {
				const likes = await Like.findAll({
					where: { offerId: offer.id }
				});
				return {
					...offer.toJSON(),
					likes: likes.length,
					is_liked: likes
						.map((like) => like.userId)
						.includes(req.userId)
				};
			})
		);
		res.json(offers);
	}
});

defineRoute({
	router: publicOffersRouter,
	feature: FEATURE,
	path: "/offer/:id",
	method: "get",
	description: "get an offer by id",
	handler: async (req, res) => {
		const offer = await Offer.findByPk(req.params.id, { include: "user" });
		if (!offer) throw new NotFoundError("Offer Not Found!");
		const likes = await Like.findAll({
			where: {
				offerId: offer.id
			}
		});
		res.json({
			...offer.toJSON(),
			likes: likes.length,
			is_liked: likes.map((like) => like.userId).includes(req.userId)
		});
	}
});

defineRoute({
	router: publicOffersRouter,
	feature: FEATURE,
	path: "/search/",
	method: "get",
	description: "search for offers",
	handler: async (req, res) => {
		const { query } = req.query;
		let offers = await Offer.findAll({
			where: {
				[Op.or]: [
					{ title: { [Op.iLike]: `%${query}%` } },
					{ description: { [Op.iLike]: `%${query}%` } },
					{ appliances: { [Op.iLike]: `%${query}%` } }
				]
			}
		});
		offers = await Promise.all(
			offers.map(async (offer) => {
				const likes = await Like.findAll({
					where: { offerId: offer.id }
				});
				return {
					...offer.toJSON(),
					likes: likes.length,
					is_liked: likes
						.map((like) => like.userId)
						.includes(req.userId)
				};
			})
		);
		res.json(offers);
	}
});

const addOfferSchema = joi.object({
	title: joi.string().required().max(50),
	description: joi.string().allow(""),
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
	images: joi.array().items(joi.string()).default([]),
	appliances: joi.string().allow(""),
	notes: joi.string()
});
defineRoute({
	router: privateOffersRouter,
	feature: FEATURE,
	path: "/create",
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

defineRoute({
	router: privateOffersRouter,
	feature: FEATURE,
	path: "/remove/:id",
	method: "delete",
	description: "delete an offer",
	handler: async (req, res) => {
		const offer = await Offer.findByPk(req.params.id);
		if (!offer) throw new NotFoundError("Offer not found!");
		try {
			offer.destroy();
			res.json(offer);
		} catch (error) {
			throw new InternalServerError(
				"Something went wrong while deleting the offer, please try again later."
			);
		}
	}
});

module.exports = { privateOffersRouter, publicOffersRouter };
