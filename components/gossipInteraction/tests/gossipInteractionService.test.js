const mongoose = require('mongoose');
const gossipInteractionService = require('../gossipInteractionService');

afterAll(() => {
  mongoose.connection.close();
});

test('regossip Gossip', async () => {
  const regossip = await gossipInteractionService.regossipGossip(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(regossip).not.toBeFalsy();
});

test('retrieve Most Liked Gossip', async () => {
  const mostLikedGossips =
    await gossipInteractionService.retrieveMostLikedGossips();
  expect(mostLikedGossips).not.toBeFalsy();
});

test('retrieve Most Commented Gossip', async () => {
  const mostCommentedGossips =
    await gossipInteractionService.retrieveMostCommentedGossips();
  expect(mostCommentedGossips).not.toBeFalsy();
});

test('retrieve Most Shared Gossip', async () => {
  const mostSharedGossips =
    await gossipInteractionService.retrieveMostSharedGossips();
  expect(mostSharedGossips).not.toBeFalsy();
});

test('retrieve Most Regossiped Gossip', async () => {
  const mostRegossipedGossips =
    await gossipInteractionService.retrieveMostRegossipedGossips();
  expect(mostRegossipedGossips).not.toBeFalsy();
});

test('like gossip', async () => {
  const likeGossip = await gossipInteractionService.likeGossip(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(likeGossip).not.toBeFalsy();
});

test('comment gossip', async () => {
  const commentGossip = await gossipInteractionService.commentGossip(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2',
    'awesome stuff!'
  );
  expect(commentGossip).not.toBeFalsy();
});

test('share gossip', async () => {
  const shareGossip = await gossipInteractionService.shareGossip(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(shareGossip).not.toBeFalsy();
});

test('bookmark gossip', async () => {
  const bookmarkGossip = await gossipInteractionService.bookmarkGossip(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(bookmarkGossip).not.toBeFalsy();
});

test('report gossip', async () => {
  const reportGossip = await gossipInteractionService.reportGossip(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(reportGossip).not.toBeFalsy();
});

test('unlike post', async () => {
  const unlikedPost = await gossipInteractionService.unlikePost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(unlikedPost).not.toBeFalsy();
});

test('uncomment post', async () => {
  const uncommentedPost = await gossipInteractionService.uncommentPost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(uncommentedPost).not.toBeFalsy();
});

test('unbookmark post', async () => {
  const unbookmarkedPost = await gossipInteractionService.unbookmarkPost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(unbookmarkedPost).not.toBeFalsy();
});

test('unreport post', async () => {
  const unreportedPost = await gossipInteractionService.unreportPost(
    '617fa207f6627d2599288c30',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(unreportedPost).not.toBeFalsy();
});

test('retrieveLikedGossips', async () => {
  const likedGossips = await gossipInteractionService.retrieveLikedGossips(
    '617fc7e5e8bee9ff94617ab0',
    0
  );
  expect(likedGossips).not.toBeFalsy();
});

test('retrieveCommentedGossips', async () => {
  const commentedGossips =
    await gossipInteractionService.retrieveCommentedGossips(
      '617fc7e5e8bee9ff94617ab0',
      0
    );
  expect(commentedGossips).not.toBeFalsy();
});

test('retrieveBookmarkedGossips', async () => {
  const bookmarkedGossips =
    await gossipInteractionService.retrieveBookmarkedGossips(
      '617fc7e5e8bee9ff94617ab0',
      0
    );
  expect(bookmarkedGossips).not.toBeFalsy();
});

test('retrieveRegossipedGossips', async () => {
  const regossipedGossips =
    await gossipInteractionService.retrieveRegossipedGossips(
      '617fc7e5e8bee9ff94617ab2',
      0
    );
  expect(regossipedGossips).not.toBeFalsy();
});

test('retrieve users details', async () => {
  const userDetails = await gossipInteractionService.retrieveUserDetails(
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(userDetails).not.toBeFalsy();
});

test('check whether user following ', async () => {
  const userFollowing =
    await gossipInteractionService.checkWhetherUserFollowing(
      '617fc7e5e8bee9ff94617ab0',
      '617fc7e5e8bee9ff94617ab1'
    );
  expect(userFollowing).not.toBeFalsy();
});

test('follow or unfollow userID', async () => {
  const updateList = await gossipInteractionService.followOrUnfollowUser(
    '617fc7e5e8bee9ff94617ab0',
    '617fc7e5e8bee9ff94617ab2'
  );
  expect(updateList).not.toBeFalsy();
});

test('retrieve user following list', async () => {
  const followingList =
    await gossipInteractionService.retrieveUserFollowingList(
      '617fc7e5e8bee9ff94617ab0',
      1
    );
  console.log(followingList);
  expect(followingList).not.toBeFalsy();
});
