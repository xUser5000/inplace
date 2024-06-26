const { Server } = require("socket.io");
const { Message } = require("./models");

const io = new Server();
io.on("connection", (socket) => {
	console.log(`user with id ${socket.id} connected`);
	// room is the defualt reciver room that is his id
	socket.on("sendMessage", async (data, room) => {
		await Message.create({
			sender_id: socket.id,
			reciver_id: room,
			content: data
		});
		socket.to(room).emit("reciveMessage", data);
	});
});

module.exports = { io };
