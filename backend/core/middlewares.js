const joi = require("joi");
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
    }
};

const schemaValidator = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body, { presence: "required", abortEarly: false });
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

module.exports = { errorHandler, schemaValidator };
