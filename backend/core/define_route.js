const Joi = require("joi");
const j2s = require("joi-to-swagger");
const { schemaValidator } = require("./middlewares");
const { APIDocs } = require("./swagger");

const defineRoute = ({
	router,
	feature,
	path,
	method,
	description,
	inputSchema,
	middlewares,
	handler
}) => {
	/* Validation */
	if (typeof feature !== "string") {
		throw new TypeError("feature must be a string");
	}

	if (typeof path !== "string") {
		throw new TypeError("path must be a string");
	}

	if (
		typeof method !== "string" ||
		!["get", "post", "put", "delete", "patch"].includes(
			method.toLowerCase()
		)
	) {
		throw new TypeError(
			"method must be a valid HTTP method (get, post, put, delete, patch)"
		);
	}

	if (description && typeof description !== "string") {
		throw new TypeError("description must be a string");
	}

	if (inputSchema && !Joi.isSchema(inputSchema)) {
		throw new TypeError("inputSchema must be a Joi schema object");
	}

	if (!middlewares) middlewares = [];
	if (
		!Array.isArray(middlewares) ||
		!middlewares.every((fn) => typeof fn === "function")
	) {
		throw new TypeError(
			"middlewares must be an array of express middleware functions"
		);
	}

	if (typeof handler !== "function") {
		throw new TypeError(
			"handler must be an express route handling function"
		);
	}

	/* Registering the documentation entry */
	const entry = {
		["/" + feature + path + "/"]: {
			[method]: {
				summary: description,
				tags: [feature],
				requestBody: inputSchema
					? {
							content: {
								"application/json": {
									schema: j2s(inputSchema).swagger
								}
							}
					  }
					: {}
			}
		}
	};
	const docs = APIDocs.get();
	docs.paths = {
		...docs.paths,
		...entry
	};
	APIDocs.set(docs);

	/* Setup joi validation */
	if (inputSchema) middlewares.push(schemaValidator(inputSchema));

	/* Registering the route */
	router[method](path, ...middlewares, handler);
};

module.exports = { defineRoute };
