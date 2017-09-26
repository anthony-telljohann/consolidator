# consolidator

[![Greenkeeper badge](https://badges.greenkeeper.io/atelljohannsmothers/consolidator.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/atelljohannsmothers/consolidator.svg?branch=master)](https://travis-ci.org/atelljohannsmothers/consolidator)
[![codecov](https://codecov.io/gh/atelljohannsmothers/consolidator/branch/master/graph/badge.svg)](https://codecov.io/gh/atelljohannsmothers/consolidator)
[![NPM version](https://img.shields.io/npm/v/consolidator.svg)](https://www.npmjs.com/package/consolidator)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Consolidate sources to a destination.

## Usage

Install with yarn

```
yarn add consolidator
```

```js
import {
  consolidate,
  consolidateGlobToFile,
  consolidateFilesToFile,
  consolidateFileToFile
} from 'consolidator';
```

### API

#### `consolidate(sources, destination)`

* `sources` `{String}` glob pattern
* `destination` `{String}` file path

```js
consolidate('sources/*', 'destination/consolidated');
```

#### `consolidate(sources, destination)`

* `sources` `{Array}` file paths
* `destination` `{String}` file path

```js
consolidate(['sources/source', 'other-sources/source'], 'destination/consolidated');
```

#### `consolidateGlobToFile(sources, destination)`

* `sources` `{String}` glob pattern
* `destination` `{String}` file path

```js
consolidateGlobToFile('sources/*', 'destination/consolidated');
```

#### `consolidateFilesToFile(sources, destination)`

* `sources` `{Array}` file paths
* `destination` `{String}` file path

```js
consolidateFilesToFile(['sources/source', 'other-sources/source'], 'destination/consolidated');
```

#### `consolidateFileToFile(source, destination)`

* `source` `{String}` file path
* `destination` `{String}` file path

```js
consolidateFileToFile('sources/source', 'destination/consolidated');
```
