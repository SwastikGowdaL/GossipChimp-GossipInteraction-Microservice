/* eslint-disable camelcase */
const gossipInteractionDAL = require('./gossipInteractionDAL');

const regossipGossip = async (postID, userID) => {
  try {
    const gossipData = await gossipInteractionDAL.queryGossip(postID);
    const { gossip, hashtags } = gossipData;
    let userDetails = await gossipInteractionDAL.queryUserDetails(userID);
    userDetails = JSON.parse(JSON.stringify(userDetails));
    const newGossip = {
      gossip,
      hashtags,
      author_authorized: userDetails.authorized,
      author_name: userDetails.name,
      author_id: userDetails._id,
      author_pic_id: userDetails.profile_pic.url,
    };
    return await gossipInteractionDAL.regossipGossip(userID, newGossip);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  regossipGossip,
};
