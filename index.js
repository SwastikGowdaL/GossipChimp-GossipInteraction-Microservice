require('./db/mongoose');
const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

const Gossip = require('./models/gossip');
const gossipInteractionService = require('./components/gossipInteraction/gossipInteractionService');
const config = require('./config/config');

io.on('connection', (socket) => {
  socket.on('retrieveUserDetails', async (userID) => {
    const userDetails = await gossipInteractionService.retrieveUserDetails(
      userID
    );
    socket.emit('userDetails', userDetails);
  });
});

http.listen(config.PORT, () => {
  console.log('listening to port 4000');
});
