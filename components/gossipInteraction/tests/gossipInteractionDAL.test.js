const mongoose = require('mongoose');
const gossipInteractionDAL = require('../gossipInteractionDAL');

const expectedUpdateResultIfAlreadyExists = {
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1,
};

const expectedUpdateResultIfNotExists = {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1,
};

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
//   console.log(isMostSharedGossipsCached);
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
