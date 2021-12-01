import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const chooseFormater = (difference, formater) => {
  if (formater === 'stylish') {
    return stylish(difference);
  }

  if (formater === 'plain') {
    return plain(difference);
  }

  if (formater === 'json') {
    return json(difference);
  }

  throw new Error(`gendiff isn't available in ${formater} format`);
};

export default chooseFormater;
