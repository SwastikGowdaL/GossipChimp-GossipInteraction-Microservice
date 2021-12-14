/* eslint-disable camelcase */
const gossipInteractionDAL = require('./gossipInteractionDAL');

const regossipGossip = async (postID, userID) => {
  try {
    const alreadyRegossiped =
      await gossipInteractionDAL.checkIfAlreadyRegossiped(postID, userID);
    if (alreadyRegossiped) return 'already Regossiped';

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
    await gossipInteractionDAL.updatePostRegossips(postID, userID);
    await gossipInteractionDAL.updateUsersRegossipedList(postID, userID);
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

const retrieveMostCommentedGossips = async () => {
  try {
    const isMostCommentedGossipsCached =
      await gossipInteractionDAL.doesKeyExist('mostCommentedGossips');
    if (isMostCommentedGossipsCached) {
      return await gossipInteractionDAL.retrieveCachedListData(
        'mostCommentedGossips'
      );
    }
    const mostCommentedGossips =
      await gossipInteractionDAL.mostCommentedGossips();
    const result = [];
    for (const item of mostCommentedGossips) {
      result.push(JSON.stringify(item));
    }
    await gossipInteractionDAL.cacheListData('mostCommentedGossips', result);
    await gossipInteractionDAL.setExpiry('mostCommentedGossips');
    return mostCommentedGossips;
  } catch (err) {
    console.log(err);
  }
};

const retrieveMostSharedGossips = async () => {
  try {
    const isMostSharedGossipsCached = await gossipInteractionDAL.doesKeyExist(
      'mostSharedGossips'
    );
    if (isMostSharedGossipsCached) {
      return await gossipInteractionDAL.retrieveCachedListData(
        'mostSharedGossips'
      );
    }
    const mostSharedGossips = await gossipInteractionDAL.mostSharedGossips();
    const result = [];
    for (const item of mostSharedGossips) {
      result.push(JSON.stringify(item));
    }
    await gossipInteractionDAL.cacheListData('mostSharedGossips', result);
    await gossipInteractionDAL.setExpiry('mostSharedGossips');
    return mostSharedGossips;
  } catch (err) {
    console.log(err);
  }
};

const retrieveMostRegossipedGossips = async () => {
  try {
    const isMostRegossipedGossipsCached =
      await gossipInteractionDAL.doesKeyExist('mostRegossipedGossips');
    if (isMostRegossipedGossipsCached) {
      return await gossipInteractionDAL.retrieveCachedListData(
        'mostRegossipedGossips'
      );
    }
    const mostRegossipedGossips =
      await gossipInteractionDAL.mostRegossipedGossips();
    const result = [];
    for (const item of mostRegossipedGossips) {
      result.push(JSON.stringify(item));
    }
    await gossipInteractionDAL.cacheListData('mostRegossipedGossips', result);
    await gossipInteractionDAL.setExpiry('mostRegossipedGossips');
    return mostRegossipedGossips;
  } catch (err) {
    console.log(err);
  }
};

const likeGossip = async (postID, userID) => {
  try {
    await gossipInteractionDAL.updatePostLikes(postID, userID);
    await gossipInteractionDAL.updateUsersLikedList(postID, userID);
    return 'liked';
  } catch (err) {
    console.log(err);
  }
};

const commentGossip = async (postID, userID, comment) => {
  try {
    await gossipInteractionDAL.updatePostComments(postID, userID, comment);
    await gossipInteractionDAL.updateUsersCommentedList(postID, userID);
    return 'commented';
  } catch (err) {
    console.log(err);
  }
};

const shareGossip = async (postID, userID) => {
  try {
    await gossipInteractionDAL.updatePostShares(postID, userID);
    return 'shared';
  } catch (err) {
    console.log(err);
  }
};

const bookmarkGossip = async (postID, userID) => {
  try {
    await gossipInteractionDAL.updatePostBookmarks(postID, userID);
    await gossipInteractionDAL.updateUsersBookmarkedList(postID, userID);
    return 'bookmarked';
  } catch (err) {
    console.log(err);
  }
};

const reportGossip = async (postID, userID) => {
  try {
    await gossipInteractionDAL.updatePostReports(postID, userID);
    await gossipInteractionDAL.updateUsersReportedList(postID, userID);
    return 'Reported';
  } catch (err) {
    console.log(err);
  }
};

const unlikePost = async (postID, userID) => {
  try {
    await gossipInteractionDAL.unlikePost(postID, userID);
    await gossipInteractionDAL.unlikeFromUsersLikedList(postID, userID);
    return 'unliked';
  } catch (err) {
    console.log(err);
  }
};

const uncommentPost = async (postID, userID) => {
  try {
    await gossipInteractionDAL.uncommentPost(postID, userID);
    await gossipInteractionDAL.uncommentFromUsersCommentedList(postID, userID);
    return 'unCommented';
  } catch (err) {
    console.log(err);
  }
};

const unbookmarkPost = async (postID, userID) => {
  try {
    await gossipInteractionDAL.unbookmarkPost(postID, userID);
    await gossipInteractionDAL.unbookmarkFromUsersBookmarkedList(
      postID,
      userID
    );
    return 'unbookmarked';
  } catch (err) {
    console.log(err);
  }
};

const unreportPost = async (postID, userID) => {
  try {
    await gossipInteractionDAL.unreportPost(postID, userID);
    await gossipInteractionDAL.unreportFromUsersReportedList(postID, userID);
    return 'unreported';
  } catch (err) {
    console.log(err);
  }
};

const retrieveGossip = async (arrayOfPostID) => {
  try {
    const readyGossips = [];
    for (const postID of arrayOfPostID) {
      const gossip = await gossipInteractionDAL.queryGossip(postID);
      readyGossips.push(gossip);
    }
    return readyGossips;
  } catch (err) {
    console.log(err);
  }
};

const retrieveLikedGossips = async (userID, skip) => {
  try {
    const likedGossipsID = await gossipInteractionDAL.queryLikedGossipsID(
      userID
    );
    if (likedGossipsID[0].liked_gossips.length <= 10) {
      return await retrieveGossip(likedGossipsID[0].liked_gossips);
    }
    return await retrieveGossip(
      likedGossipsID[0].liked_gossips.slice(skip, skip + 10)
    );
  } catch (err) {
    console.log(err);
  }
};

const retrieveCommentedGossips = async (userID, skip) => {
  try {
    const commentedGossipsID =
      await gossipInteractionDAL.queryCommentedGossipsID(userID);
    if (commentedGossipsID[0].commented_gossips.length <= 10) {
      return await retrieveGossip(commentedGossipsID[0].commented_gossips);
    }
    return await retrieveGossip(
      commentedGossipsID[0].commented_gossips.slice(skip, skip + 10)
    );
  } catch (err) {
    console.log(err);
  }
};

const retrieveBookmarkedGossips = async (userID, skip) => {
  try {
    const bookmarkedGossipsID =
      await gossipInteractionDAL.queryBookmarkedGossipsID(userID);
    if (bookmarkedGossipsID[0].bookmarked_gossips.length <= 10) {
      return await retrieveGossip(bookmarkedGossipsID[0].bookmarked_gossips);
    }
    return await retrieveGossip(
      bookmarkedGossipsID[0].bookmarked_gossips.slice(skip, skip + 10)
    );
  } catch (err) {
    console.log(err);
  }
};

const retrieveRegossipedGossips = async (userID, skip) => {
  try {
    const regossipedGossipsID =
      await gossipInteractionDAL.queryRegossipedGossipsID(userID);
    if (regossipedGossipsID[0].regossiped_gossips.length <= 10) {
      return await retrieveGossip(regossipedGossipsID[0].regossiped_gossips);
    }
    return await retrieveGossip(
      regossipedGossipsID[0].regossiped_gossips.slice(skip, skip + 10)
    );
  } catch (err) {
    console.log(err);
  }
};

const retrieveUserDetails = async (userID) => {
  try {
    let userDetails = await gossipInteractionDAL.queryUserDetails(userID);
    userDetails = JSON.parse(JSON.stringify(userDetails));
    delete userDetails.password;
    delete userDetails._id;
    delete userDetails.liked_gossips;
    delete userDetails.commented_gossips;
    delete userDetails.reported_gossips;
    delete userDetails.regossiped_gossips;
    delete userDetails.bookmarked_gossips;
    delete userDetails.notifications;
    delete userDetails.settings;
    delete userDetails.__v;
    return userDetails;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  regossipGossip,
  retrieveMostLikedGossips,
  retrieveMostCommentedGossips,
  retrieveMostSharedGossips,
  retrieveMostRegossipedGossips,
  likeGossip,
  commentGossip,
  shareGossip,
  bookmarkGossip,
  reportGossip,
  unlikePost,
  uncommentPost,
  unbookmarkPost,
  unreportPost,
  retrieveLikedGossips,
  retrieveCommentedGossips,
  retrieveBookmarkedGossips,
  retrieveRegossipedGossips,
  retrieveUserDetails,
};
