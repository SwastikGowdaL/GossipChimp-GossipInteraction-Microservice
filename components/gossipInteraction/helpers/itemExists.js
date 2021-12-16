const itemExists = (arrayOfItems, userID) => {
  for (const item of arrayOfItems) {
    if (item.author_id === userID) return true;
  }
  return false;
};

module.exports = itemExists;
