const mongoose = require('mongoose');

const followersListSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  followers_list: [
    {
      type: String,
    },
  ],
});

const followersList = mongoose.model('FollowersList', followersListSchema);

module.exports = followersList;
