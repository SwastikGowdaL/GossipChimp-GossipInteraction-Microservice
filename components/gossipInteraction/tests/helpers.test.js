const { isExportDeclaration } = require('typescript');
const helpers = require('../helpers');

test('item exists', async () => {
  const itemExists = helpers.itemExists(
    [
      {
        author_id: 'author_id3',
        interaction_points: 0,
        _id: '617baaa2b1c50acba941bea6',
      },
      {
        author_id: '617fc7e5e8bee9ff94617ab1',
        interaction_points: 0,
        _id: '61b9e6d514732d6a24cd3273',
      },
    ],
    '617fc7e5e8bee9ff94617ab1'
  );
  console.log(itemExists);
  expect(itemExists).not.toBeFalsy();
});
