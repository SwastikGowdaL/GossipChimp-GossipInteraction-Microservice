const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  //* db conn for gossipChimp and another db conn while testing
  GOSSIP_CHIMP: process.env.GOSSIP_CHIMP,
  GOSSIP_CHIMP_TEST: process.env.GOSSIP_CHIMP_TEST,

  //* auth key for requests
  AUTH_KEY: process.env.AUTH_KEY,
};
