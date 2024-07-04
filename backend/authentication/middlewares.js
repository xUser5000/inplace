const { ForbiddenError } = require("../core/errors");
const { decodeAuthorizationToken } = require("./utils");

function attachUserInfoToReq() {
	return (req, res, next) => {
		const authToken = req.headers["x-auth-token"];
		if (authToken) {
			const decoded = decodeAuthorizationToken(authToken);
			req.userId = decoded.userId;
		}
		next();
	};
}

function jwtFilter() {
	return (req, res, next) => {
		if (!req.userId) {
			throw new ForbiddenError("No authorization token provided");
		}
		next();
	};
}

module.exports = { attachUserInfoToReq, jwtFilter };
