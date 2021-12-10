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

const retrieveMostLikedGossips = async () => {
  try {
    const isMostLikedGossipsCached = await gossipInteractionDAL.doesKeyExist(
      'mostLikedGossips'
    );
    if (isMostLikedGossipsCached) {
      return await gossipInteractionDAL.retrieveCachedListData(
        'mostLikedGossips'
      );
    }
    const mostLikedGossips = await gossipInteractionDAL.mostLikedGossips();
    const result = [];
    for (const item of mostLikedGossips) {
      result.push(JSON.stringify(item));
    }
    await gossipInteractionDAL.cacheListData('mostLikedGossips', result);
    await gossipInteractionDAL.setExpiry('mostLikedGossips');
    return mostLikedGossips;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  regossipGossip,
  retrieveMostLikedGossips,
};
