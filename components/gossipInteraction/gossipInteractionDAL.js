require('../../db/mongoose');
const Gossip = require('../../models/gossip');
const Users = require('../../models/users');

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
};
