const mongoose = require('mongoose');
const gossipInteractionService = require('../gossipInteractionService');

afterAll(() => {
  mongoose.connection.close();
});

test('regossip Gossip', async () => {
  const regossip = await gossipInteractionService.regossipGossip(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(regossip).not.toBeFalsy();
});
