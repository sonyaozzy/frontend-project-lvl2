import _ from 'lodash';

const stylish = (node) => {
  const replacer = ' ';
  const spacesCount = 4;

  const formatValue = (value, depth) => {
    if (!_.isPlainObject(value) || value === null) {
      return value;
    }

    const nestedIndentSize = (spacesCount * depth);
    const nestedIndent = replacer.repeat(nestedIndentSize);

    const previousDepth = depth - 1;
    const bracketIndentSize = spacesCount * previousDepth;
    const bracketIndent = replacer.repeat(bracketIndentSize);

    const entries = Object.entries(value);
    const lines = entries.map(([key, val]) => `${nestedIndent}${key}: ${formatValue(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const iter = (currentNode, depth) => {
    const diffIndentSize = 2;
    const indentSize = (spacesCount * depth) - diffIndentSize;
    const currentIndent = replacer.repeat(indentSize);

    const previousDepth = depth - 1;
    const bracketIndentSize = spacesCount * previousDepth;
    const bracketIndent = replacer.repeat(bracketIndentSize);

    const lines = currentNode
      .map((child) => {
        const currentStatus = child.status;

        switch (currentStatus) {
          case 'nested':
            return `${currentIndent}  ${child.name}: ${iter(child.children, depth + 1)}`;

          case 'unchanged':
            return `${currentIndent}  ${child.name}: ${formatValue(child.value, depth + 1)}`;

          case 'removed':
            return `${currentIndent}- ${child.name}: ${formatValue(child.value, depth + 1)}`;

          case 'added':
            return `${currentIndent}+ ${child.name}: ${formatValue(child.value, depth + 1)}`;

          case 'updated':
            return `${currentIndent}- ${child.name}: ${formatValue(child.oldValue, depth + 1)}\n${currentIndent}+ ${child.name}: ${formatValue(child.newValue, depth + 1)}`;

          default:
            throw new Error(`Unknown difference: '${currentStatus}'!`);
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(node, 1);
};

export default stylish;
