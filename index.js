const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

let users = [];

// Allow Crros-Origin Request
// TODO: Block insecure origins
io.origins('*:*');

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let interval;

io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });

  socket.on('joinRequest', (data) => {
    console.log(data);

    // console.log(`${userName} has joined the live session`);

    // users.push(userName);

    // socket.emit('newUser', userName);
    socket.emit('joinAccept', {
      sessionName: data.sessionName,
      userName: data.userName,
    });
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
