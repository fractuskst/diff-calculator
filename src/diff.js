import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parse from './parsers.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const getFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(getData(filepath1), getFormat(filepath1));
  const file2 = parse(getData(filepath2), getFormat(filepath2));

  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (_.has(file1, key) && _.has(file2, key) && file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`;
    }
    return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  });
  return ['{', ...diff, '}'].join('\n');
};

export default genDiff;
