import _ from 'lodash';

const findDiff = (object1, object2, keys) => {
  if (keys.length === 0) {
    return '';
  }
  const [first, ...rest] = keys;

  const restDiff = findDiff(object1, object2, rest);

  const buildStr = (operator, key, object) => ` ${operator} ${key}: ${object[key]}`;

  if (_.has(object1, first) && !_.has(object2, first)) {
    return `${buildStr('-', first, object1)}\n${restDiff}`;
  }

  if (!_.has(object1, first) && _.has(object2, first)) {
    return `${buildStr('+', first, object2)}\n${restDiff}`;
  }

  if (object1[first] !== object2[first]) {
    return `${buildStr('-', first, object1)}\n${buildStr('+', first, object2)}\n${restDiff}`;
  }

  return `${buildStr(' ', first, object1)}\n${restDiff}`;
};

const showDiff = (file1Content, file2Content) => {
  const firstKeys = Object.keys(file1Content);
  const secondKeys = Object.keys(file2Content);

  const keys = _.union(firstKeys, secondKeys);
  const uniqKeys = _.uniq(keys);
  const sortedKeys = _.sortBy(uniqKeys);

  return `{\n${findDiff(file1Content, file2Content, sortedKeys)}}`;
};

export default showDiff;
