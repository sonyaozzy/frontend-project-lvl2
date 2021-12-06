### Hexlet tests and linter status:

[![Actions Status](https://github.com/sonyaozzy/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/sonyaozzy/frontend-project-lvl2/actions)
[![github-actions-lint](https://github.com/sonyaozzy/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/sonyaozzy/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/5b858da388318cdba8bf/maintainability)](https://codeclimate.com/github/sonyaozzy/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5b858da388318cdba8bf/test_coverage)](https://codeclimate.com/github/sonyaozzy/frontend-project-lvl2/test_coverage)

**Gendiff** is a program that compares two configuration files and shows a difference.

**Utility features:**

- Support for different input formats: <a href="#yaml">yaml</a>, <a href="#json">json</a>
- Generating a report in different formats: <a href="#plain">plain text</a>, <a href="#stylish">stylish</a> and <a href="#json-formatter">json</a>
- The program can work with both relative and absolute paths to files

## Installation

> _This program is for the Node.js v16.8.0 and later_

**For installation:**

Run the command:

```bash
npm install -g sonyaozzy/frontend-project-lvl2
```

## Declaring program variable

For named imports in ECMAScript modules, import from `@hexlet/code/src/gendiff.js`.

```javascript
import genDiff from "@hexlet/code/src/gendiff.js";

const diff = genDiff(filepath1, filepath2, formatName);
console.log(diff);
```

## Help for the utility:

```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

## Input formats

Utility supports two input formats: `yaml`, `json`.

<div id="json"></div>

Example of `json` files difference:

[![asciicast](https://asciinema.org/a/YbrxFbNIKKW7eyoyAO2Criima.svg)](https://asciinema.org/a/YbrxFbNIKKW7eyoyAO2Criima)

<div id="yaml"></div>

Example of `yaml` files difference:

[![asciicast](https://asciinema.org/a/B7Lh4cvtVmlOjaCUdcdgEHBXE.svg)](https://asciinema.org/a/B7Lh4cvtVmlOjaCUdcdgEHBXE)

## Formatters

<div id="stylish">
    <h3>Stylish</h3>
</div>

Stylish is the default formatter for the library.

To use `stylish` formatter run:

```bash
gendiff -f stylish file1.json file2.json
```

or

```bash
gendiff file1.json file2.json
```

_Example of stylish:_

[![asciicast](https://asciinema.org/a/qBAMSZF6ozw4MatkC8tPLvTaD.svg)](https://asciinema.org/a/qBAMSZF6ozw4MatkC8tPLvTaD)

<div id="plain">
    <h3>Plain</h3>
</div>

To use `plain` formatter run:

```bash
gendiff -f plain file1.json file2.json
```

_Example of plain:_

[![asciicast](https://asciinema.org/a/OgYNiV8tUI4uF8eqCuFrs6gBq.svg)](https://asciinema.org/a/OgYNiV8tUI4uF8eqCuFrs6gBq)

<div id="json-formatter">
    <h3>JSON</h3>
</div>

To use `json` formatter run:

```bash
gendiff -f json file1.json file2.json
```

_Example of json:_

[![asciicast](https://asciinema.org/a/AjVSFjwDkK9IESsVjmsiunlDe.svg)](https://asciinema.org/a/AjVSFjwDkK9IESsVjmsiunlDe)
