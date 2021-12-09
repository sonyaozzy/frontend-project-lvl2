import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value) && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (node) => {
  const iter = (currentNode, ancestry, delimiter) => {
    const lines = currentNode
      .map((child) => {
        const newAncestry = `${ancestry}${delimiter}${child.name}`;
        const currentStatus = child.status;
        const newDelimiter = '.';

        switch (currentStatus) {
          case 'nested':
            return iter(child.children, newAncestry, newDelimiter);

          case 'unchanged':
            return '';

          case 'removed':
            return `Property '${newAncestry}' was removed`;

          case 'added':
            return `Property '${newAncestry}' was added with value: ${stringify(child.value)}`;

          case 'updated':
            return `Property '${newAncestry}' was updated. From ${stringify(child.oldValue)} to ${stringify(child.newValue)}`;

          default:
            throw new Error(`Unknown difference: '${currentStatus}'!`);
        }
      })
      .filter((line) => line.length !== 0);

    return lines.join('\n');
  };

  return iter(node, '', '');
};

export default plain;
