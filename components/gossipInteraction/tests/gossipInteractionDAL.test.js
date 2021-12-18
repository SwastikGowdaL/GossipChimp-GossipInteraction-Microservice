const mongoose = require('mongoose');
const gossipInteractionDAL = require('../gossipInteractionDAL');

const expectedUpdateResultIfAlreadyExists = {
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1,
};

// const expectedUpdateResultIfNotExists = {
//   acknowledged: true,
//   modifiedCount: 1,
//   upsertedId: null,
//   upsertedCount: 0,
//   matchedCount: 1,
// };

afterAll(() => {
  mongoose.connection.close();
});

test('update post likes', async () => {
  const likedPost = await gossipInteractionDAL.updatePostLikes(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(likedPost).toMatchObject(expectedUpdateResultIfAlreadyExists);
});

test('update post shares', async () => {
  const sharedPost = await gossipInteractionDAL.updatePostShares(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(sharedPost).toMatchObject(expectedUpdateResultIfAlreadyExists);
});

test('update post regossips', async () => {
  const sharedPost = await gossipInteractionDAL.updatePostRegossips(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(sharedPost).toMatchObject(expectedUpdateResultIfAlreadyExists);
});

// test('update post comments', async () => {
//   const commentedPost = await gossipInteractionDAL.updatePostComments(
//     '617fa207f6627d2599288c30',
//     '617fc7e5e8bee9ff94617ab0',
//     'thanks for this info mate!'
//   );
//   expect(commentedPost).toMatchObject(expectedUpdateResultIfNotExists);
// });

test('update users liked list', async () => {
  const userLikedPost = await gossipInteractionDAL.updateUsersLikedList(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(userLikedPost).toMatchObject(expectedUpdateResultIfAlreadyExists);
});

test('update users commented list', async () => {
  const userCommentedPost = await gossipInteractionDAL.updateUsersCommentedList(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(userCommentedPost).toMatchObject(expectedUpdateResultIfAlreadyExists);
});

// test('regossip gossip', async () => {
//   const sampleGossip = {
//     gossip: 'what the up with you mate !',
//     hashtags: ['technology', 'computer'],
//     author_id: '617fc7e5e8bee9ff94617ab0',
//     author_name: 'author_name',
//     author_pic_id: 'author_pic_id',
//     author_authorized: true,
//   };
//   const regossip = await gossipInteractionDAL.regossipGossip(
//     '617fc7e5e8bee9ff94617ab0',
//     sampleGossip
//   );
//   expect(regossip).not.toBeFalsy();
// });

test('query gossip', async () => {
  let gossip = await gossipInteractionDAL.queryGossip(
    '618f5637d5670cf3560c3ef3'
  );
  gossip = JSON.parse(JSON.stringify(gossip));
  expect(gossip).toMatchObject({
    _id: '618f5637d5670cf3560c3ef3',
    gossip:
      "So it's not two-way communication, but multiple different communication channels that are handled by one socket.",
    likes: [],
    shares: [],
    regossips: [],
    hashtags: ['technology', 'computer'],
    bookmarks: [],
    author_id: 'author_id4',
    author_name: 'author_name',
    author_pic_id: 'author_pic_id',
    author_authorized: true,
    published_date: '2021-11-13T06:07:51.708Z',
    comments: [],
    __v: 0,
  });
});

test('update post bookmarks', async () => {
  const bookmarkedPost = await gossipInteractionDAL.updatePostBookmarks(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(bookmarkedPost).toMatchObject(expectedUpdateResultIfAlreadyExists);
});

test('update users bookmarked list', async () => {
  const userBookmarkedPost =
    await gossipInteractionDAL.updateUsersBookmarkedList(
      '617fa207f6627d2599288c30',
      '617fc7e5e8bee9ff94617ab0'
    );
  expect(userBookmarkedPost).toMatchObject(expectedUpdateResultIfAlreadyExists);
});

test('most likes gossips', async () => {
  const mostLikedGossips = await gossipInteractionDAL.mostLikedGossips();
  expect(mostLikedGossips).not.toBeFalsy();
});

test('most commented gossips', async () => {
  const mostCommentedGossips =
    await gossipInteractionDAL.mostCommentedGossips();
  expect(mostCommentedGossips).not.toBeFalsy();
});

test('most Regossiped gossips', async () => {
  const mostRegossipedGossips =
    await gossipInteractionDAL.mostRegossipedGossips();
  expect(mostRegossipedGossips).not.toBeFalsy();
});

test('most Shared gossips', async () => {
  const mostSharedGossips = await gossipInteractionDAL.mostSharedGossips();
  expect(mostSharedGossips).not.toBeFalsy();
});

// test('doesKeyExist', async () => {
//   const isMostSharedGossipsCached = await gossipInteractionDAL.doesKeyExist(
//     'mostSharedGossips'
//   );
//   expect(isMostSharedGossipsCached).toBeFalsy();
// });

test('set List data', async () => {
  const cacheMostCommentedGossips = await gossipInteractionDAL.cacheListData(
    'mostCommentedGossips',
    [JSON.stringify({ test: 'test' }), JSON.stringify({ test: 'test' })]
  );
  expect(cacheMostCommentedGossips).not.toBeFalsy();
});

test('setting expiry', async () => {
  const setExpiry = await gossipInteractionDAL.setExpiry(
    'mostCommentedGossips'
  );
  expect(setExpiry).not.toBeFalsy();
});

test('retrieve cached data', async () => {
  const cachedData = await gossipInteractionDAL.retrieveCachedListData(
    'testing'
  );
  expect(cachedData).not.toBeFalsy();
});

test('check if already regossiped for true', async () => {
  const alreadyRegossiped = await gossipInteractionDAL.checkIfAlreadyRegossiped(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(alreadyRegossiped).toBe(1);
});

test('check if already regossiped for false', async () => {
  const alreadyRegossiped = await gossipInteractionDAL.checkIfAlreadyRegossiped(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab1'
  );
  expect(alreadyRegossiped).toBe(0);
});

test('unlike gossip', async () => {
  const unliked = await gossipInteractionDAL.unlikePost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(unliked).not.toBeFalsy();
});

test('unlike from users liked list', async () => {
  const unlikeFromUsersLikedList =
    await gossipInteractionDAL.unlikeFromUsersLikedList(
      '617fa207f6627d2599288c30',
      '617fc7e5e8bee9ff94617ab2'
    );
  expect(unlikeFromUsersLikedList).not.toBeFalsy();
});

test('uncomment gossip', async () => {
  const uncommented = await gossipInteractionDAL.uncommentPost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(uncommented).not.toBeFalsy();
});

test('uncomment from users Commented list', async () => {
  const uncommentFromUsersCommentedList =
    await gossipInteractionDAL.uncommentFromUsersCommentedList(
      '617fa207f6627d2599288c30',
      '617fc7e5e8bee9ff94617ab2'
    );
  expect(uncommentFromUsersCommentedList).not.toBeFalsy();
});

test('unbookmark gossip', async () => {
  const unbookmarked = await gossipInteractionDAL.unbookmarkPost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(unbookmarked).not.toBeFalsy();
});

test('unbookmark from users Bookmarked list', async () => {
  const unbookmarkFromUsersBookmarkedList =
    await gossipInteractionDAL.unbookmarkFromUsersBookmarkedList(
      '617fa207f6627d2599288c30',
      '617fc7e5e8bee9ff94617ab2'
    );
  expect(unbookmarkFromUsersBookmarkedList).not.toBeFalsy();
});

test('unreport gossip', async () => {
  const unreported = await gossipInteractionDAL.unreportPost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(unreported).not.toBeFalsy();
});

test('unreport from users Reported list', async () => {
  const unreportFromUsersReportedList =
    await gossipInteractionDAL.unreportFromUsersReportedList(
      '617fa207f6627d2599288c30',
      '617fc7e5e8bee9ff94617ab2'
    );
  expect(unreportFromUsersReportedList).not.toBeFalsy();
});

test('update users regossiped list ', async () => {
  const updateUsersRegossipedList =
    await gossipInteractionDAL.updateUsersRegossipedList(
      '617fa207f6627d2599288c30',
      '617fc7e5e8bee9ff94617ab2'
    );
  expect(updateUsersRegossipedList).not.toBeFalsy();
});

test('query liked gossips ID', async () => {
  const likedGossips = await gossipInteractionDAL.queryLikedGossipsID(
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(likedGossips).not.toBeFalsy();
});

test('query commented gossips ID', async () => {
  const commentedGossips = await gossipInteractionDAL.queryCommentedGossipsID(
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(commentedGossips).not.toBeFalsy();
});

test('query bookmarked gossips ID', async () => {
  const bookmarkedGossips = await gossipInteractionDAL.queryBookmarkedGossipsID(
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(bookmarkedGossips).not.toBeFalsy();
});

test('query regossiped gossips ID', async () => {
  const regossipedGossips = await gossipInteractionDAL.queryRegossipedGossipsID(
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(regossipedGossips).not.toBeFalsy();
});

// test('update user following list', async () => {
//   const updatedFollowingList = await gossipInteractionDAL.updateFollowingList(
//     '617fc7e5e8bee9ff94617ab0',
//     '617fc7e5e8bee9ff94617ab1'
//   );
//   expect(updatedFollowingList).not.toBeFalsy();
// });

test('query User Following List', async () => {
  const userFollowingList = await gossipInteractionDAL.queryUsersFollowingList(
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(userFollowingList).not.toBeFalsy();
});

test('remove User From Following List', async () => {
  let removedUser = await gossipInteractionDAL.removeUserFromHighPriorityList(
    '617fc7e5e8bee9ff94617ab0',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(removedUser).not.toBeFalsy();
  removedUser = await gossipInteractionDAL.removeUserFromMediumPriorityList(
    '617fc7e5e8bee9ff94617ab0',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(removedUser).not.toBeFalsy();
  removedUser = await gossipInteractionDAL.removeUserFromLowPriorityList(
    '617fc7e5e8bee9ff94617ab0',
    'author_id4'
  );
  expect(removedUser).not.toBeFalsy();
});

test('query bare min user details', async () => {
  const userDetails = await gossipInteractionDAL.queryBareMinUserID(
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(userDetails).not.toBeFalsy();
});

test('update followers list', async () => {
  const followerList = await gossipInteractionDAL.updateFollowersList(
    '617fc7e5e8bee9ff94617ab0',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(followerList).not.toBeFalsy();
});

test('remove users from followers list', async () => {
  const follower = await gossipInteractionDAL.removeUserFromFollowersList(
    '617fc7e5e8bee9ff94617ab0',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(follower).not.toBeFalsy();
});

test('check whether gossip liked or not', async () => {
  const gossip = await gossipInteractionDAL.checkIfAlreadyLiked(
    '61821ec515a10999e48ac935',
    '617fc7e5e8bee9ff94617ab0'
  );
  expect(gossip).not.toBeFalsy();
});

test('increment or decrement following count', async () => {
  const following = await gossipInteractionDAL.incOrDecFollowingCount(
    '617fc7e5e8bee9ff94617ab2',
    1
  );
  expect(following).not.toBeFalsy();
});

test('increment or decrement followers count', async () => {
  const followers = await gossipInteractionDAL.incOrDecFollowersCount(
    '617fc7e5e8bee9ff94617ab2',
    1
  );
  expect(followers).not.toBeFalsy();
});
