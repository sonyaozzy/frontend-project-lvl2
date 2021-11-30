const stylish = (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    const diffIndentSize = 2;
    const indentSize = (spacesCount * depth) - diffIndentSize;
    const currentIndent = replacer.repeat(indentSize);

    const previousDepth = depth - 1;
    const bracketIndentSize = spacesCount * previousDepth;
    const bracketIndent = replacer.repeat(bracketIndentSize);

    const diffs = { removed: '-', added: '+', unchanged: ' ' };

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const currentDiff = val[0];
        const unmodifiedValue = val[1];
        const modifiedValue = val[2];

        if (currentDiff === 'updated') {
          return `${currentIndent}${diffs.removed} ${key}: ${iter(unmodifiedValue, depth + 1)}\n${currentIndent}${diffs.added} ${key}: ${iter(modifiedValue, depth + 1)}`;
        }

        return `${currentIndent}${diffs[currentDiff]} ${key}: ${iter(unmodifiedValue, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
