require('../../db/mongoose');
const Gossip = require('../../models/gossip');
const Users = require('../../models/users');

const redisClient = require('./helpers/redisClient');

const DEFAULT_EXPIRATION = 86400;

const updatePostLikes = async (postID, userID) => {
  try {
    return await Gossip.updateOne(
      {
        _id: postID,
      },
      {
        $addToSet: { likes: userID },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const updatePostShares = async (postID, userID) =>
  Gossip.updateOne(
    {
      _id: postID,
    },
    {
      $addToSet: { shares: userID },
    }
  );

const updatePostRegossips = async (postID, userID) =>
  Gossip.updateOne(
    {
      _id: postID,
    },
    {
      $addToSet: { regossips: userID },
    }
  );

const updatePostComments = async (postID, userID, comment) =>
  Gossip.updateOne(
    {
      _id: postID,
    },
    {
      $push: {
        comments: {
          commenter_id: userID,
          comment,
        },
      },
    }
  );

const updatePostBookmarks = async (postID, userID) =>
  Gossip.updateOne(
    {
      _id: postID,
    },
    {
      $addToSet: { bookmarks: userID },
    }
  );

const updateUsersLikedList = async (postID, userID) =>
  Users.updateOne(
    {
      _id: userID,
    },
    {
      $addToSet: { liked_gossips: postID },
    }
  );

const updateUsersBookmarkedList = async (postID, userID) =>
  Users.updateOne(
    {
      _id: userID,
    },
    {
      $addToSet: { bookmarked_gossips: postID },
    }
  );

const updateUsersCommentedList = async (postID, userID) =>
  Users.updateOne(
    {
      _id: userID,
    },
    {
      $addToSet: { commented_gossips: postID },
    }
  );

const regossipGossip = async (userID, gossip) => {
  try {
    const newGossip = new Gossip(gossip);
    return await newGossip.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const queryGossip = async (postID) => Gossip.findById(postID);

const queryUserDetails = async (userID) => Users.findById(userID);

const mostLikedGossips = async () =>
  Gossip.find({}).sort({ likes: 'desc' }).limit(5);

const mostCommentedGossips = async () =>
  Gossip.find({}).sort({ comments: 'desc' }).limit(5);

const mostRegossipedGossips = async () =>
  Gossip.find({}).sort({ regossips: 'desc' }).limit(5);

const mostSharedGossips = async () =>
  Gossip.find({}).sort({ shares: 'desc' }).limit(5);

const doesKeyExist = async (key) =>
  new Promise((resolve, reject) => {
    redisClient.EXISTS(key, (error, value) => {
      if (error) reject(error);
      resolve(value);
    });
  });

const cacheListData = async (key, data) =>
  new Promise((resolve, reject) => {
    redisClient.RPUSH(key, data, (error, value) => {
      if (error) reject(error);
      resolve(value);
    });
  });

const setExpiry = async (key) =>
  new Promise((resolve, reject) => {
    redisClient.EXPIRE(key, DEFAULT_EXPIRATION, (error, value) => {
      if (error) reject(error);
      resolve(value);
    });
  });

const retrieveCachedListData = async (key) =>
  new Promise((resolve, reject) => {
    redisClient.LRANGE(key, 0, -1, (error, value) => {
      if (error) reject(error);
      resolve(value);
    });
  });

module.exports = {
  updatePostLikes,
  updatePostShares,
  updatePostRegossips,
  updatePostComments,
  updateUsersLikedList,
  updateUsersCommentedList,
  regossipGossip,
  queryGossip,
  queryUserDetails,
  updatePostBookmarks,
  updateUsersBookmarkedList,
  mostLikedGossips,
  mostCommentedGossips,
  mostRegossipedGossips,
  mostSharedGossips,
  doesKeyExist,
  cacheListData,
  setExpiry,
  retrieveCachedListData,
};
