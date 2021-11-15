import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import showDiff from '../src/showDiff.js';

describe('genDiff for json', () => {
  let file1Content;
  let file2Content;

  beforeEach(() => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    const readFile = (filename) => JSON.parse(fs.readFileSync(getFixturePath(filename), 'utf-8'));

    file1Content = readFile('file1.json');
    file2Content = readFile('file2.json');
  });

  test('show difference between same files', () => {
    const expected = '{\n   follow: false\n   host: hexlet.io\n   proxy: 123.234.53.22\n   timeout: 50\n}';
    expect(showDiff(file1Content, file1Content)).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';
    expect(showDiff(file1Content, file2Content)).toEqual(expected1);

    const expected2 = '{\n + follow: false\n   host: hexlet.io\n + proxy: 123.234.53.22\n - timeout: 20\n + timeout: 50\n - verbose: true\n}';
    expect(showDiff(file2Content, file1Content)).toEqual(expected2);
  });
});

describe('genDiff for yaml', () => {
  let file1Content;
  let file2Content;

  beforeEach(() => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    const readFile = (filename) => yaml.load(fs.readFileSync(getFixturePath(filename)));

    file1Content = readFile('file1.yml');
    file2Content = readFile('file2.yaml');
  });

  test('show difference between same files', () => {
    const expected = '{\n   follow: false\n   host: hexlet.io\n   proxy: 123.234.53.22\n   timeout: 50\n}';
    expect(showDiff(file1Content, file1Content)).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';
    expect(showDiff(file1Content, file2Content)).toEqual(expected1);

    const expected2 = '{\n + follow: false\n   host: hexlet.io\n + proxy: 123.234.53.22\n - timeout: 20\n + timeout: 50\n - verbose: true\n}';
    expect(showDiff(file2Content, file1Content)).toEqual(expected2);
  });
});
