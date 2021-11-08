import _ from 'lodash';

const findDiff = (object1, object2, keys) => {
  if (keys.length === 0) {
      return '';
  }
  const [first, ...rest] = keys;

  const diff = findDiff(object1, object2, rest);

  const buildStr = (operator, key, object) => {
    return ` ${operator} ${key}: ${object[key]}`;
  }

  if (_.has(object1, first) && !_.has(object2, first)) {
    return `${buildStr('-', first, object1)}\n${diff}`;
  }

  if (!_.has(object1, first) && _.has(object2, first)) {
    return `${buildStr('+', first, object2)}\n${diff}`;
  }

  if (object1[first] !== object2[first]) {
    return `${buildStr('-', first, object1)}\n${buildStr('+', first, object2)}\n${diff}`;
  }

  if (object1[first] === object2[first]) {
    return `${buildStr(' ', first, object1)}\n${diff}`;
  }
};

const showDiff = (firstObject, secondObject) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);

  const keys = _.union(firstKeys, secondKeys);
  const uniqKeys = _.uniq(keys);
  const sortedKeys = _.sortBy(uniqKeys);

  return `{\n${findDiff(firstObject, secondObject, sortedKeys)}}`;
};

export default showDiff;
