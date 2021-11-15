import * as path from 'path';
import * as fs from 'fs';
import parse from './parsers.js';

const readFile = (filepath) => {
  const fileExt = path.extname(filepath);
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const parsedContent = parse(fileContent, fileExt);
  return parsedContent;
};

export default readFile;
