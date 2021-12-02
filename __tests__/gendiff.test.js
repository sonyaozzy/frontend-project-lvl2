import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => `${path.join(__dirname, '..', '__fixtures__', filename)}`;

describe('"stylish" genDiff for json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(filepath1, filepath1);

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(filepath1, filepath2);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(filepath2, filepath1);

    expect(actual2).toEqual(expected2);
  });
});

describe('"stylish" genDiff for yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  const expectedFile = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(filepath1, filepath1);

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(filepath1, filepath2);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(filepath2, filepath1);

    expect(actual2).toEqual(expected2);
  });
});

describe('"plain" genDiff for json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = '';
    const actual = genDiff(filepath1, filepath1, 'plain');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[0];
    const actual1 = genDiff(filepath1, filepath2, 'plain');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[1];
    const actual2 = genDiff(filepath2, filepath1, 'plain');

    expect(actual2).toEqual(expected2);
  });
});

describe('"plain" genDiff for yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  const expectedFile = fs.readFileSync(getFixturePath('expected-plain.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = '';
    const actual = genDiff(filepath1, filepath1, 'plain');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[0];
    const actual1 = genDiff(filepath1, filepath2, 'plain');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[1];
    const actual2 = genDiff(filepath2, filepath1, 'plain');

    expect(actual2).toEqual(expected2);
  });
});

describe('"json" genDiff for json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(filepath1, filepath1, 'json');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(filepath1, filepath2, 'json');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(filepath2, filepath1, 'json');

    expect(actual2).toEqual(expected2);
  });
});

describe('"json" genDiff for yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  const expectedFile = fs.readFileSync(getFixturePath('expected-json.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = genDiff(filepath1, filepath1, 'json');

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = genDiff(filepath1, filepath2, 'json');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = genDiff(filepath2, filepath1, 'json');

    expect(actual2).toEqual(expected2);
  });
});

describe('genDiff with unknown formater', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  test('should throw an error for unknown formater', () => {
    expect(() => {
      genDiff(filepath1, filepath2, 'unknown');
    }).toThrow("gendiff isn't available in unknown format");
  });
});
