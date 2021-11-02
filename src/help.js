import { program } from 'commander/esm.mjs';

const showHelp = () => {

  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')

  program.parse();
};

export default showHelp;
