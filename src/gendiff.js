import findDiff from './findDiff.js';
import chooseFormater from './formatters/index.js';

const genDiff = (file1Content, file2Content, formater = 'stylish') => {
  const difference = findDiff(file1Content, file2Content);
  const result = chooseFormater(difference, formater);

  return result;
};

export default genDiff;
