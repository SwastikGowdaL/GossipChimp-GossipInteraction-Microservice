const mongoose = require('mongoose');
const config = require('../config/config');

const dbConn = config.GOSSIP_CHIMP;

mongoose.connect(dbConn, {
  useNewUrlParser: true,
});

mongoose.connection
  .once('open', () => {
    console.log('connected');
  })
  .on('error', (error) => {
    console.log('err', error);
  });
