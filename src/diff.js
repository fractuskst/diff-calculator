import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import makeDiffTree from './makeDiffTree.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const getFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const file1 = parse(getData(filepath1), getFormat(filepath1));
  const file2 = parse(getData(filepath2), getFormat(filepath2));
  const diff = makeDiffTree(file1, file2);
  return format(diff, formatType);
};

export default genDiff;
