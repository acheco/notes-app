const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

const reducer = (array) => {
  return array.length === 0
    ? 0
    : array.reduce((sum, item) => {
        return sum + item;
      }, 0);
};

module.exports = {
  average,
  reverse,
  reducer,
};
