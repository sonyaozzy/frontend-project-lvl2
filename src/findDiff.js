import _ from 'lodash';

const findDiff = (object1, object2) => {
  const firstKeys = Object.keys(object1);
  const secondKeys = Object.keys(object2);

  const keys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.reduce((acc, key) => {
    switch (true) {
      case (_.has(object1, key) && !_.has(object2, key)):
        return [...acc, { name: key, status: 'removed', value: object1[key] }];

      case (!_.has(object1, key) && _.has(object2, key)):
        return [...acc, { name: key, status: 'added', value: object2[key] }];

      case ((typeof object1[key] === 'object') && (typeof object2[key] === 'object')):
        return [...acc, { name: key, status: 'nested', children: findDiff(object1[key], object2[key]) }];

      case (!_.isEqual(object1[key], object2[key])):
        return [...acc, {
          name: key, status: 'updated', oldValue: object1[key], newValue: object2[key],
        }];

      default:
        return [...acc, { name: key, status: 'unchanged', value: object1[key] }];
    }
  }, []);

  return result;
};

export default findDiff;
