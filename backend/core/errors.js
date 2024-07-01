const joi = require("joi");

class APIError extends Error {
	constructor(obj) {
		const errorSchema = joi.object({
			code: joi.number().required(),
			name: joi.string().required(),
			message: joi.string().required(),
			details: joi
				.object()
				.pattern(
					joi.string(),
					joi.array().items(joi.string()).required()
				)
		});

		const validationResult = errorSchema.validate(obj);
		if (validationResult.error) {
			throw validationResult.error;
		}

		super(obj.message);

		this.code = obj.code;
		this.name = obj.name;
		this.message = obj.message;
		this.details = obj.details;
	}
}

class NotFoundError extends APIError {
	constructor(message) {
		super({
			code: 404,
			name: "NotFoundError",
			message
		});
	}
}

class ValidationError extends APIError {
	constructor(message, details) {
		super({
			code: 400,
			name: "ValidationError",
			message,
			details
		});
	}
}

class ForbiddenError extends APIError {
	constructor(message) {
		super({
			code: 403,
			name: "ForbiddenError",
			message
		});
	}
}


class MissingResultOptionsError extends APIError {
	constructor(message) {
		super({
			code: 500,
			name: "MissingResultOptionsError",
			message
		});
	}
}

class AttributesNotFoundError extends APIError {
	constructor(message) {
		super({
			code: 500,
			name: "AttributesNotFoundError",
			message
		});
	}
}

class InternalServerError extends APIError {
	constructor(message) {
		super({
			code: 500,
			name: "InternalServerError",
			message
		});
	}
}

module.exports = {
	APIError,
	NotFoundError,
	ValidationError,
	ForbiddenError,
	InternalServerError,
	MissingResultOptionsError,
	AttributesNotFoundError
};