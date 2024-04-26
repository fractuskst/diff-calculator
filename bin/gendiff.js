#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/diff.js';
import convertPath from '../src/path.js';

program
  .description("Compares two configuration files and shows a difference.")
  .version('1.0.0')
  .option('-f, --format [type], output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const absPath1 = convertPath(filepath1);
    const absPath2 = convertPath(filepath2); 
    const difference = genDiff(absPath1, absPath2);
    console.log(difference);
  });
program.parse(process.argv);
