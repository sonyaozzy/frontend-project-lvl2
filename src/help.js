import { program } from 'commander/esm.mjs';

const showHelp = () => {

  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')

  program.parse();
};

export default showHelp;
