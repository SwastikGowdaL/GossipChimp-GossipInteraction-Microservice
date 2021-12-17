require('../../db/mongoose');
const Gossip = require('../../models/gossip');
const Users = require('../../models/users');
const FollowingList = require('../../models/followingList');
const FollowersList = require('../../models/followersList');

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

const updatePostReports = async (postID, userID) =>
  Gossip.updateOne(
    {
      _id: postID,
    },
    {
      $addToSet: { reports: userID },
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

const updateUsersRegossipedList = async (postID, userID) =>
  Users.updateOne(
    {
      _id: userID,
    },
    {
      $addToSet: { regossiped_gossips: postID },
    }
  );

const updateUsersReportedList = async (postID, userID) =>
  Users.updateOne(
    {
      _id: userID,
    },
    {
      $addToSet: { reported_gossips: postID },
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

const checkIfAlreadyRegossiped = async (postID, userID) =>
  Gossip.find({
    _id: postID,
    regossips: { $in: [`${userID}`] },
  }).count();

const unlikePost = async (postID, userID) =>
  Gossip.updateOne({ _id: postID }, { $pull: { likes: userID } });

const unlikeFromUsersLikedList = async (postID, userID) =>
  Users.updateOne({ _id: userID }, { $pull: { liked_gossips: postID } });

const uncommentPost = async (postID, userID) =>
  Gossip.updateOne(
    { _id: postID },
    { $pull: { comments: { commenter_id: userID } } }
  );

const uncommentFromUsersCommentedList = async (postID, userID) =>
  Users.updateOne({ _id: userID }, { $pull: { commented_gossips: postID } });

const unbookmarkPost = async (postID, userID) =>
  Gossip.updateOne({ _id: postID }, { $pull: { bookmarks: userID } });

const unbookmarkFromUsersBookmarkedList = async (postID, userID) =>
  Users.updateOne({ _id: userID }, { $pull: { bookmarked_gossips: postID } });

const unreportPost = async (postID, userID) =>
  Gossip.updateOne({ _id: postID }, { $pull: { reports: userID } });

const unreportFromUsersReportedList = async (postID, userID) =>
  Users.updateOne({ _id: userID }, { $pull: { reported_gossips: postID } });

const queryLikedGossipsID = async (userID) =>
  Users.find({ _id: userID }, { liked_gossips: 1 });

const queryCommentedGossipsID = async (userID) =>
  Users.find({ _id: userID }, { commented_gossips: 1 });

const queryBookmarkedGossipsID = async (userID) =>
  Users.find({ _id: userID }, { bookmarked_gossips: 1 });

const queryRegossipedGossipsID = async (userID) =>
  Users.find({ _id: userID }, { regossiped_gossips: 1 });

const queryUsersFollowingList = async (userID) =>
  FollowingList.findOne({ user_id: userID });

const updateFollowingList = async (userID, followingUserID) =>
  FollowingList.updateOne(
    {
      _id: userID,
    },
    {
      $addToSet: {
        'following_list.medium_priority_list': {
          author_id: followingUserID,
        },
      },
    }
  );

const removeUserFromHighPriorityList = async (userID, followingUserID) =>
  FollowingList.updateOne(
    {
      user_id: userID,
    },
    {
      $pull: {
        'following_list.high_priority_list': {
          author_id: followingUserID,
        },
      },
    }
  );

const removeUserFromMediumPriorityList = async (userID, followingUserID) =>
  FollowingList.updateOne(
    {
      user_id: userID,
    },
    {
      $pull: {
        'following_list.medium_priority_list': {
          author_id: followingUserID,
        },
      },
    }
  );

const removeUserFromLowPriorityList = async (userID, followingUserID) =>
  FollowingList.updateOne(
    {
      user_id: userID,
    },
    {
      $pull: {
        'following_list.low_priority_list': {
          author_id: followingUserID,
        },
      },
    }
  );

const queryBareMinUserID = async (userID) =>
  Users.findOne({ _id: userID }, { name: 1, profile_pic: 1, tagline: 1 });

const updateFollowersList = async (userID, followerID) =>
  FollowersList.updateOne(
    { user_id: userID },
    { $addToSet: { followers_list: followerID } }
  );

const removeUserFromFollowersList = async (userID, followerID) =>
  FollowersList.updateOne(
    { user_id: userID },
    { $pull: { followers_list: followerID } }
  );

const queryFollowersList = async (userID) =>
  FollowersList.find({ user_id: userID }, { followers_list: 1 });

const checkIfAlreadyLiked = async (postID, userID) =>
  Gossip.find({
    _id: postID,
    likes: { $in: [`${userID}`] },
  }).count();

const checkIfAlreadyBookmarked = async (postID, userID) =>
  Gossip.find({
    _id: postID,
    bookmarks: { $in: [`${userID}`] },
  }).count();

const checkIfAlreadyReported = async (postID, userID) =>
  Gossip.find({
    _id: postID,
    reports: { $in: [`${userID}`] },
  }).count();

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
  checkIfAlreadyRegossiped,
  updateUsersRegossipedList,
  updateUsersReportedList,
  updatePostReports,
  unlikePost,
  unlikeFromUsersLikedList,
  uncommentPost,
  uncommentFromUsersCommentedList,
  unbookmarkPost,
  unbookmarkFromUsersBookmarkedList,
  unreportPost,
  unreportFromUsersReportedList,
  queryLikedGossipsID,
  queryCommentedGossipsID,
  queryBookmarkedGossipsID,
  queryRegossipedGossipsID,
  updateFollowingList,
  queryUsersFollowingList,
  removeUserFromHighPriorityList,
  removeUserFromMediumPriorityList,
  removeUserFromLowPriorityList,
  queryBareMinUserID,
  updateFollowersList,
  removeUserFromFollowersList,
  queryFollowersList,
  checkIfAlreadyLiked,
  checkIfAlreadyBookmarked,
  checkIfAlreadyReported,
};
