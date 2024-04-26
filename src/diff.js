import fs from 'fs';
import _ from 'lodash';
import parseFile from './parse.js';

const genDiff = (filepath1, filepath2) => {
  let result = '';

  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');

  const json1 = parseFile(file1);
  const json2 = parseFile(file2);

  const keys = _.union(Object.keys(json1), Object.keys(json2));
  const sortedKeys = _.sortBy(keys);

  sortedKeys.forEach((key) => {
    if (_.has(json1, key) && _.has(json2, key)) {
      if (json1[key] === json2[key]) {
        result += `    ${key}: ${json1[key]}\n`;
      } else {
        result += `  - ${key}: ${json1[key]}\n`;
        result += `  + ${key}: ${json2[key]}\n`;
      }
    } else if (_.has(json2, key)) {
      result += `  + ${key}: ${json2[key]}\n`;
    } else {
      result += `  - ${key}: ${json1[key]}\n`;
    }
  });
  return `{\n${result}}`;
};
export default genDiff;
