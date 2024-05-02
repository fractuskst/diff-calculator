import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expected = readFile('expectedResult.txt');

test('gendiff JSON', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  expect(genDiff(json1, json2)).toEqual(expected);
});

test('gendiff YAML', () => {
  const yaml1 = getFixturePath('file1.yaml');
  const yaml2 = getFixturePath('file2.yaml');
  expect(genDiff(yaml1, yaml2)).toEqual(expected);
});
