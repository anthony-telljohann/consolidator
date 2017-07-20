# consolidator

[![Build Status](https://travis-ci.org/atelljohannsmothers/consolidator.svg?branch=master)](https://travis-ci.org/atelljohannsmothers/consolidator)
[![codecov](https://codecov.io/gh/atelljohannsmothers/consolidator/branch/master/graph/badge.svg)](https://codecov.io/gh/atelljohannsmothers/consolidator)
[![NPM version](https://img.shields.io/npm/v/consolidator.svg)](https://www.npmjs.com/package/consolidator)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Consolidate sources to a destination.

## Usage

Install with npm

```
npm install consolidator
```

```js
import { consolidate } from 'consolidator';
```

### API

#### `consolidate(sources, destination)`

* `sources` `{String}` glob pattern
* `destination` `{String}` file path

```js
consolidate('sources/*', 'destination/consolidated');
```
