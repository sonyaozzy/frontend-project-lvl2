import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test } from '@jest/globals';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => `${path.join(__dirname, '..', '__fixtures__', filename)}`;

const expectedFileStylish = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
const expectedFilePlain = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
const expectedFileJson = fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8');

const data = [
  ['file1.json', 'file2.json', 'stylish', expectedFileStylish.trim()],
  ['file1.yml', 'file2.yaml', 'stylish', expectedFileStylish.trim()],
  ['file1.json', 'file2.json', 'plain', expectedFilePlain.trim()],
  ['file1.yml', 'file2.yaml', 'plain', expectedFilePlain.trim()],
  ['file1.json', 'file2.json', 'json', expectedFileJson.trim()],
  ['file1.yml', 'file2.yaml', 'json', expectedFileJson.trim()],
];

test.each(data)('%s and %s %s diff', (filename1, filename2, formatName, expected) => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);

  const actual = genDiff(filepath1, filepath2, formatName);
  expect(actual).toEqual(expected);
});

test('should throw an error for unknown formater', () => {
  expect(() => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    genDiff(filepath1, filepath2, 'unknown');
  }).toThrow("gendiff isn't available in unknown format");
});
