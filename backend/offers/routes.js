const offersRouter = require("express").Router();
const joi = require("joi");
const { schemaValidator } = require("../core/middlewares");
const { ForbiddenError } = require("../core/errors");
const { Offer } = require("./models");
offersRouter.get("/offer", async (req, res) => {
	const allOffers = await Offer.findAll();
	res.json({ status: "ok", allOffers });
});

offersRouter.get("/offer/:id", async (req, res) => {
	const offer = await Offer.findOne({ where: { id: req.params.id } });
	if (!offer) throw new ForbiddenError("invalid offerId");
	res.json({ status: "ok", offer });
});

const addOfferSchema = joi.object({
	Location: joi.required(),
	Images: joi.string().required(),
	IsFurnished: joi.boolean().required(),
	ForSale: joi.boolean().required(),
	ForRent: joi.boolean().required()
});

offersRouter.post(
	"/offer",
	schemaValidator(addOfferSchema),
	async (req, res) => {
		const offer = await Offer.create(req.body);
		res.json({ status: "ok", offer });
	}
);
module.exports = { offersRouter };
