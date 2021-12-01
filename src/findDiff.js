import _ from 'lodash';

const makeChildsEmptyDiff = (child) => {
  if (typeof child !== 'object' || child === null) {
    return child;
  }

  const entries = Object.entries(child);
  const result = entries.reduce((acc, [key, value]) => ([...acc, { name: key, difference: 'unchanged', value: makeChildsEmptyDiff(value) }]), []);
  return result;
};

const findDiff = (object1, object2) => {
  const firstKeys = Object.keys(object1);
  const secondKeys = Object.keys(object2);

  const keys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.reduce((acc, key) => {
    const childrenWithEmptyDiff1 = makeChildsEmptyDiff(object1[key]);
    const childrenWithEmptyDiff2 = makeChildsEmptyDiff(object2[key]);

    if (_.has(object1, key) && !_.has(object2, key)) {
      return [...acc, { name: key, difference: 'removed', value: childrenWithEmptyDiff1 }];
    }
    if (!_.has(object1, key) && _.has(object2, key)) {
      return [...acc, { name: key, difference: 'added', value: childrenWithEmptyDiff2 }];
    }
    if ((typeof object1[key] === 'object') && (typeof object2[key] === 'object')) {
      return [...acc, { name: key, difference: 'unchanged', value: findDiff(object1[key], object2[key]) }];
    }
    if (object1[key] !== object2[key]) {
      return [...acc, {
        name: key, difference: 'updated', value: childrenWithEmptyDiff1, updatedValue: childrenWithEmptyDiff2,
      }];
    }

    return [...acc, { name: key, difference: 'unchanged', value: childrenWithEmptyDiff1 }];
  }, []);

  return result;
};

export default findDiff;
