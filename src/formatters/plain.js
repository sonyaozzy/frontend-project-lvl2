import path from 'path';

const stringify = (value) => {
  if (Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (value) => {
  const iter = (currentValue, ancestry) => {
    if (!Array.isArray(currentValue)) {
      return '';
    }

    const lines = currentValue
      .map((key) => {
        const newAncestry = (path.join(ancestry, key.name)).replaceAll('/', '.');
        const currentDiff = key.difference;
        const unmodifiedValue = stringify(key.value);
        const modifiedValue = stringify(key.updatedValue);

        if (currentDiff === 'unchanged') {
          return iter(key.value, newAncestry);
        }
        if (currentDiff === 'removed') {
          return `Property '${newAncestry}' was removed`;
        }

        if (currentDiff === 'added') {
          return `Property '${newAncestry}' was added with value: ${unmodifiedValue}`;
        }

        return `Property '${newAncestry}' was updated. From ${unmodifiedValue} to ${modifiedValue}`;
      })
      .filter((line) => line.length !== 0);

    return lines.join('\n');
  };

  return iter(value, '');
};

export default plain;
