import { program } from 'commander/esm.mjs';
import genDiff from './gendiff.js';

const generateDiff = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
      const options = program.opts();

      const result = genDiff(filepath1, filepath2, options.format);

      console.log(result);
    });

  program.parse();
};

export default generateDiff;
