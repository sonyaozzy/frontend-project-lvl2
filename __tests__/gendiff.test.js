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

describe('"stylish" formatter genDiff', () => {
  const expectedData = expectedFileStylish.trim().split('\n\n\n');

  const data = [
    ['file1.json', 'file1.json', expectedData[0]],
    ['file1.json', 'file2.json', expectedData[1]],
    ['file2.json', 'file1.json', expectedData[2]],
    ['file1.yml', 'file1.yml', expectedData[0]],
    ['file1.yml', 'file2.yaml', expectedData[1]],
    ['file2.yaml', 'file1.yml', expectedData[2]],
  ];

  test.each(data)('show difference between %s and %s', (filename1, filename2, expected) => {
    const filepath1 = getFixturePath(filename1);
    const filepath2 = getFixturePath(filename2);

    const actual = genDiff(filepath1, filepath2);
    expect(actual).toEqual(expected);
  });
});

describe('"plain" formatter genDiff', () => {
  const expectedData = expectedFilePlain.trim().split('\n\n\n');

  const data = [
    ['file1.json', 'file1.json', 'plain', ''],
    ['file1.json', 'file2.json', 'plain', expectedData[0]],
    ['file2.json', 'file1.json', 'plain', expectedData[1]],
    ['file1.yml', 'file1.yml', 'plain', ''],
    ['file1.yml', 'file2.yaml', 'plain', expectedData[0]],
    ['file2.yaml', 'file1.yml', 'plain', expectedData[1]],
  ];

  test.each(data)('show difference between %s and %s', (filename1, filename2, formatName, expected) => {
    const filepath1 = getFixturePath(filename1);
    const filepath2 = getFixturePath(filename2);

    const actual = genDiff(filepath1, filepath2, formatName);
    expect(actual).toEqual(expected);
  });
});

describe('"json" formatter genDiff', () => {
  const expectedData = expectedFileJson.trim().split('\n\n\n');

  const data = [
    ['file1.json', 'file1.json', 'json', expectedData[0]],
    ['file1.json', 'file2.json', 'json', expectedData[1]],
    ['file2.json', 'file1.json', 'json', expectedData[2]],
    ['file1.yml', 'file1.yml', 'json', expectedData[0]],
    ['file1.yml', 'file2.yaml', 'json', expectedData[1]],
    ['file2.yaml', 'file1.yml', 'json', expectedData[2]],
  ];

  test.each(data)('show difference between %s and %s', (filename1, filename2, formatName, expected) => {
    const filepath1 = getFixturePath(filename1);
    const filepath2 = getFixturePath(filename2);

    const actual = genDiff(filepath1, filepath2, formatName);
    expect(actual).toEqual(expected);
  });
});

describe('genDiff with unknown formatter', () => {
  test('should throw an error for unknown formater', () => {
    expect(() => {
      const filepath1 = getFixturePath('file1.json');
      const filepath2 = getFixturePath('file2.json');

      genDiff(filepath1, filepath2, 'unknown');
    }).toThrow("gendiff isn't available in unknown format");
  });
});
