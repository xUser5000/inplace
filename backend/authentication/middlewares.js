const { ForbiddenError } = require("../core/errors");
const { decodeAuthorizationToken } = require("./utils");

function jwtFilter() {
	return (req, res, next) => {
		const authToken = req.headers["x-auth-token"];
		if (!authToken) {
			throw new ForbiddenError("No authorization token provided");
		}

		const decoded = decodeAuthorizationToken(authToken);
		req.userId = decoded.userId;
		next();
	};
}

module.exports = { jwtFilter };
