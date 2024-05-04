import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.txt');

test('gendiff JSON', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  expect(genDiff(json1, json2)).toEqual(expectedStylish);
  expect(genDiff(json1, json2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(json1, json2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(json1, json2, 'json')).toEqual(expectedJson);
});

test('gendiff YAML', () => {
  const yaml1 = getFixturePath('file1.yaml');
  const yaml2 = getFixturePath('file2.yaml');
  expect(genDiff(yaml1, yaml2)).toEqual(expectedStylish);
  expect(genDiff(yaml1, yaml2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(yaml1, yaml2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(yaml1, yaml2, 'json')).toEqual(expectedJson);
});
