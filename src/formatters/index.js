import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatter = (difference, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(difference);

    case 'plain':
      return plain(difference);

    case 'json':
      return json(difference);

    default:
      throw new Error(`gendiff isn't available in ${formatName} format`);
  }
};

export default formatter;
