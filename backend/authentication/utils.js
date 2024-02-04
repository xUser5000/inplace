const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function verificationEmail(email, verificationToken) {
	const subject = "Verify your InPlace account";
	const html = `
        Thank you for registering with InPlace!<br>
        
        Please click <a href="http://localhost:3000/auth/verify/${verificationToken.content}">here</a> to verify your account.
    `;
	return {
		to: email,
		subject,
		html
	};
}

function generateVerificationToken(userId) {
	return jwt.sign({ userId }, process.env.JWT_VERIFICATION_PRIVATE_KEY);
}

function generateAuthorizationToken(userId) {
	return jwt.sign({ userId }, process.env.JWT_AUTHORIZATION_PRIVATE_KEY);
}

function decodeVerificationToken(token) {
	return jwt.verify(token, process.env.JWT_VERIFICATION_PRIVATE_KEY);
}

function decodeAuthorizationToken(token) {
	return jwt.verify(token, process.env.JWT_AUTHORIZATION_PRIVATE_KEY);
}

async function hash(password) {
	const salt = await bcrypt.genSalt();
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

async function compareHash(plain, hash) {
	return await bcrypt.compare(plain, hash);
}

module.exports = {
	verificationEmail,
	generateVerificationToken,
	generateAuthorizationToken,
	decodeVerificationToken,
	decodeAuthorizationToken,
	hash,
	compareHash
};
