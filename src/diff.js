import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

const getFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2) => {
  let result = '';

  const file1 = parse(getData(filepath1), getFormat(filepath1));
  const file2 = parse(getData(filepath2), getFormat(filepath2));

  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = _.sortBy(keys);

  sortedKeys.forEach((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        result += `    ${key}: ${file1[key]}\n`;
      } else {
        result += `  - ${key}: ${file1[key]}\n`;
        result += `  + ${key}: ${file2[key]}\n`;
      }
    } else if (_.has(file2, key)) {
      result += `  + ${key}: ${file2[key]}\n`;
    } else {
      result += `  - ${key}: ${file1[key]}\n`;
    }
  });
  return `{\n${result}}`;
};
export default genDiff;
