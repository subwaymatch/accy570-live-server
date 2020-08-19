const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

// Allow Crros-Origin Request
// TODO: Block insecure origins
io.origins('*:*');

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
