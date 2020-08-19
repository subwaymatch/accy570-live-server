const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Allow Crros-Origin Request
// TODO: Block insecure origins
io.origins('*:*');

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});
