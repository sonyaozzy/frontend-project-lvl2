import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/gendiff.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => {
  const fileExt = path.extname(filename);
  return parse(fs.readFileSync(getFixturePath(filename), 'utf-8'), fileExt);
};

describe('"stylish" genDiff for json', () => {
  const file1Content = readFile('file1.json');
  const file2Content = readFile('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(file1Content, file1Content);

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(file1Content, file2Content);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(file2Content, file1Content);

    expect(actual2).toEqual(expected2);
  });
});

describe('"stylish" genDiff for yaml', () => {
  const file1Content = readFile('file1.yml');
  const file2Content = readFile('file2.yaml');

  const expectedFile = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(file1Content, file1Content);

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(file1Content, file2Content);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(file2Content, file1Content);

    expect(actual2).toEqual(expected2);
  });
});

describe('"plain" genDiff for json', () => {
  const file1Content = readFile('file1.json');
  const file2Content = readFile('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = '';
    const actual = genDiff(file1Content, file1Content, 'plain');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[0];
    const actual1 = genDiff(file1Content, file2Content, 'plain');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[1];
    const actual2 = genDiff(file2Content, file1Content, 'plain');

    expect(actual2).toEqual(expected2);
  });
});

describe('"plain" genDiff for yaml', () => {
  const file1Content = readFile('file1.yml');
  const file2Content = readFile('file2.yaml');

  const expectedFile = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = '';
    const actual = genDiff(file1Content, file1Content, 'plain');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[0];
    const actual1 = genDiff(file1Content, file2Content, 'plain');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[1];
    const actual2 = genDiff(file2Content, file1Content, 'plain');

    expect(actual2).toEqual(expected2);
  });
});

describe('"json" genDiff for json', () => {
  const file1Content = readFile('file1.json');
  const file2Content = readFile('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(file1Content, file1Content, 'json');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(file1Content, file2Content, 'json');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(file2Content, file1Content, 'json');

    expect(actual2).toEqual(expected2);
  });
});

describe('"json" genDiff for yaml', () => {
  const file1Content = readFile('file1.yml');
  const file2Content = readFile('file2.yaml');

  const expectedFile = fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(file1Content, file1Content, 'json');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(file1Content, file2Content, 'json');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(file2Content, file1Content, 'json');

    expect(actual2).toEqual(expected2);
  });
});

describe('genDiff with unknown formater', () => {
  const file1Content = readFile('file1.json');
  const file2Content = readFile('file2.json');

  test('should throw an error for unknown formater', () => {
    expect(() => {
      genDiff(file1Content, file2Content, 'unknown');
    }).toThrow("gendiff isn't available in unknown format");
  });
});
