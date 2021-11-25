import findDiff from './findDiff.js';
import stylish from './formaters.js';

const genDiff = (file1Content, file2Content, formater = 'stylish') => {
  const difference = findDiff(file1Content, file2Content);

  if (formater !== 'stylish') {
    throw new Error(`gendiff isn't available for ${formater} format`);
  }
  return stylish(difference);
};

export default genDiff;
