import * as yaml from 'js-yaml';
import _ from 'lodash';

const parse = (data, dataFormatName) => {
  if (dataFormatName === 'json') {
    return JSON.parse(data);
  }
  if (dataFormatName === 'yaml' || dataFormatName === 'yml') {
    return yaml.load(data);
  }

  throw new Error(`gendiff isn't available for ${_.trimStart(dataFormatName, '.')} format`);
};

export default parse;
