import { program } from 'commander/esm.mjs';
import readJsonFile from './readJsonFile.js';
import showDiff from './findDiff.js';

const genDiff = () => {

  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
      if (filepath1.endsWith('.json') && filepath2.endsWith('.json')) {
        const file1Content = readJsonFile(filepath1);
        const file2Content = readJsonFile(filepath2);

        const difference = showDiff(file1Content, file2Content);

        console.log(difference);
      } else {
        console.log('gendiff is available only for json format');
      }
    });

  program.parse();
};

export default genDiff;
