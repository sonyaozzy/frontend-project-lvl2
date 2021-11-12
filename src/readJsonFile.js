import * as path from 'path';
import * as fs from 'fs';

const readJsonFile = (filepath) => {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, filepath);
  const fileContent = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));

  return fileContent;
};

export default readJsonFile;
