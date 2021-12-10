const jsonifyArrayData = async (array) => {
  const result = [];
  for (const item of array) {
    result.push(JSON.stringify(item));
  }
  return result;
};

module.exports = jsonifyArrayData;
