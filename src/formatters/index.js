import plain from './plain.js';
import stylish from './stylish.js';

const chooseFormater = (difference, formater) => {
  if (formater === 'stylish') {
    return stylish(difference);
  }

  if (formater === 'plain') {
    return plain(difference);
  }

  throw new Error(`gendiff isn't available for ${formater} format`);
};

export default chooseFormater;
