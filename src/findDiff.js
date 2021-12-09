import _ from 'lodash';

const findDiff = (object1, object2) => {
  const firstKeys = Object.keys(object1);
  const secondKeys = Object.keys(object2);

  const keys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.reduce((acc, key) => {
    if (!_.has(object2, key)) {
      return [...acc, { name: key, status: 'removed', value: object1[key] }];
    }

    if (!_.has(object1, key)) {
      return [...acc, { name: key, status: 'added', value: object2[key] }];
    }

    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return [...acc, { name: key, status: 'nested', children: findDiff(object1[key], object2[key]) }];
    }

    if (!_.isEqual(object1[key], object2[key])) {
      return [...acc, {
        name: key, status: 'updated', oldValue: object1[key], newValue: object2[key],
      }];
    }

    return [...acc, { name: key, status: 'unchanged', value: object1[key] }];
  }, []);

  return result;
};

export default findDiff;
