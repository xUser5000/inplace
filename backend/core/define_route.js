const Joi = require("joi");
const j2s = require("joi-to-swagger");
const { schemaValidator } = require("./middlewares");
const { APIDocs } = require("../docs/swagger");

const defineRoute = ({
	router,
	path,
	method,
	tag,
	description,
	inputSchema,
	middlewares,
	handler
}) => {
	/* Validation */
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

	if (tag && typeof tag !== "string") {
		throw new TypeError("tag must be a string");
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
		[path]: {
			[method]: {
				summary: description,
				tags: [tag],
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

	/* Registering the route */
	if (inputSchema) middlewares.push(schemaValidator(inputSchema));

	router[method](path, ...middlewares, handler);
};

module.exports = { defineRoute };
