const offersRouter = require("express").Router();
const joi = require("joi");
const { schemaValidator } = require("../core/middlewares");
const { NotFoundError } = require("../core/errors");
const { Offer } = require("./models");

offersRouter.get("/offer", async (req, res) => {
	const allOffers = await Offer.findAll();
	res.json({ allOffers });
});

offersRouter.get("/offer/:id", async (req, res) => {
	const offer = await Offer.findByPk(req.params.id);
	if (!offer) throw new NotFoundError("Offer Not Found!");
	res.json({ offer });
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
	listOfAppliances: joi.array().items(joi.string()),
	notes: joi.string(),
	description: joi.string().max(50)
});
offersRouter.post(
	"/offer",
	schemaValidator(addOfferSchema),
	async (req, res) => {
		const offer = await Offer.create(req.body);
		res.json(offer);
	}
);
module.exports = { offersRouter };
