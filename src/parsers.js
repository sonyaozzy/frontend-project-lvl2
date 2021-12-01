import * as yaml from 'js-yaml';
import _ from 'lodash';

const parse = (data, fileExt) => {
  if (fileExt === '.json') {
    return JSON.parse(data);
  }
  if (fileExt === '.yaml' || fileExt === '.yml') {
    return yaml.load(data);
  }

  throw new Error(`gendiff isn't available for ${_.trimStart(fileExt, '.')} format`);
};

export default parse;
