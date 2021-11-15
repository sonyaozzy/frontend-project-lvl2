import { program } from 'commander/esm.mjs';
import readFile from './readFile.js';
import showDiff from './showDiff.js';

const genDiff = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
      const file1Content = readFile(filepath1);
      const file2Content = readFile(filepath2);

      const difference = showDiff(file1Content, file2Content);

      console.log(difference);
    });

  program.parse();
};

export default genDiff;
