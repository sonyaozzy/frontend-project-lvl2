import findDiff from './findDiff.js';
import formatter from './formatters/index.js';
import readContent from './readContent.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = readContent(filepath1);
  const content2 = readContent(filepath2);

  const difference = findDiff(content1, content2);
  const result = formatter(difference, formatName);

  return result;
};

export default genDiff;
