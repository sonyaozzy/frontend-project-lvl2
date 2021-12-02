import findDiff from './findDiff.js';
import chooseFormater from './formatters/index.js';
import readFile from './readFile.js';

const genDiff = (filepath1, filepath2, formater = 'stylish') => {
  const file1Content = readFile(filepath1);
  const file2Content = readFile(filepath2);

  const difference = findDiff(file1Content, file2Content);
  const result = chooseFormater(difference, formater);

  return result;
};

export default genDiff;
