import * as yaml from 'js-yaml';
import _ from 'lodash';

const parse = (data, ext) => {
  if (ext === 'json') {
    return JSON.parse(data);
  }
  if (ext === 'yaml' || ext === 'yml') {
    return yaml.load(data);
  }

  throw new Error(`gendiff isn't available for ${_.trimStart(ext, '.')} format`);
};

export default parse;
