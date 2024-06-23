const express = require("express");
const router = express.Router();
const { Server } = require("socket.io");
const { Message } = require("./models");

// Set up the Socket.IO server
let io;

const initializeChat = (server) => {
	io = new Server(server);

	io.on("connection", (socket) => {
		console.log("a user connected");

		// Handle incoming messages
		socket.on("chat message", async (msg) => {
			const { content, sender } = msg;
			// Save the message to the database
			await Message.create({ content, sender });

			// Emit the message to all clients
			io.emit("chat message", msg);
		});

		socket.on("disconnect", () => {
			console.log("user disconnected");
		});
	});
};

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = { router, initializeChat };
