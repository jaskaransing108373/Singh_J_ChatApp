const express = require('express');
const path = require('path');
const messenger = require('socket.io')();

const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3030;

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html")); // localhost:3000/index.html
});

app.get("/chat", (req, res) => {
	res.sendFile(path.join(__dirname, '/views/chat.html')); // localhost:3000/index.html
});

const server = app.listen(port, () => {
	console.log(`app is running on port ${port}`);
});


messenger.attach(server);

messenger.on('connection', function (socket) {
	console.log(`a user connected: ${socket.id}`);

	//send the connected user their assigned ID
	socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });

	socket.on('chat_message', function (msg) {
		console.log(msg);

		messenger.emit('new_message', { id: socket.id, message: msg })
	})

	socket.on('userJoined', function (user) {
		console.log(user + 'has joined the chat');
		messenger.emit('newUser', user);
	})


	socket.on('disconnect', function (socket) {
		console.log('a user has disconnected');
	});
});