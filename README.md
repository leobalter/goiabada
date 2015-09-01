# ![Goiabada](images/goiabada-text.png)

This is an experimental project providing a very simple (and incomplete) unit test tool written using ES6 features.

[![npm version](https://badge.fury.io/js/goiabada.svg)](http://badge.fury.io/js/goiabada)
[![Code Climate](https://codeclimate.com/github/leobalter/goiabada/badges/gpa.svg)](https://codeclimate.com/github/leobalter/goiabada)
[![Build Status](https://travis-ci.org/leobalter/goiabada.svg?branch=master)](https://travis-ci.org/leobalter/goiabada)
[![Coverage Status](https://coveralls.io/repos/leobalter/goiabada/badge.svg)](https://coveralls.io/r/leobalter/goiabada)
[![Dependency Status](https://david-dm.org/leobalter/goiabada.svg)](https://david-dm.org/leobalter/goiabada)
[![devDependency Status](https://david-dm.org/leobalter/goiabada/dev-status.svg)](https://david-dm.org/leobalter/goiabada#info=devDependencies)

## Rationale

I saw a lot of people very excited with the new changes on [babel (6to5)](https://babeljs.io/) and after talking to some friends at work, I decided to play with some ES6 doing this unit test framework using a lot of its features.

So far it's using several ES6 features together, like:

- Classes
- Promises
- Generators (++ to this one as it solved the async tests order like a charm)
- Arrow functions
- template strings
- parameters destructuring
- shorthand properties

Reviews, comments and PR are more than welcome! I'll love any feedback.

## Development

Clone it!

```
git clone git@github.com:leobalter/goiabada.git
```

Install npm dependencies

```
npm install
```

Run `npm test` to see it working.

## Usage

Import goiabada and instantiate a new object:

```js
import Goiabada from "goiabada";

var goiabada = new Goiabada();
```

Write your tests using the `test` method, catch the `assert` parameter and write your assertions, then call `end()` when you're done testing.

```js
goiabada.test( assert => {
    assert.ok( true, "it works!" );
    assert.end();
});
```

Call `start` to run the test queue from all the tests you declared.

```js
goiabada.start();
```

If you prefer calling only `test`, without the namespace, you can add this line:

```js
var test = goiabada.test.bind( goiabada );
```

### Browser

There's no current browser implementation of Goiabada, but I have plans to make it work, as soon as I can find something clean and simple to make bundle the source files into an UMD source using a single namespace.

Help wanted!

## API

### Assertions:

- `ok( value[, message ] )`: evaluates the value to true. e.g.: `true`, `1` or `"non-empty string"`.
- `notOk( value[, message ] )`: evaluates the value to false.
- `equal( value, expected[, message ] )`: non strict comparison (`==`).
- `notEqual( value, expected[, message ] )`: negative non strict comparison (`!=`).
- `deepEqual( value, expected[, message ] )`: deep equal comparison.
- `notDeepEqual( value, expected[, message ] )`: negative deep equal comparison.
- `same( value, expected[, message ] )`: strict comparison (`===`).
- `notSame( value, expected[, message ] )`: negative strict comparison (`!==`).
- `throws( fn[, message ] )`: passes when the given fn throws an error.

All assertions return a boolean representing the result, except throws which returns the error.

### Assert helpers

- `expect( n )`: expects a number of given assertions to run from that point.
  - The last expected assertion will trigger the `end()` method.
- `end()`: when triggered manually, it will close the test and:
  - trigger an error if you still have remaining tests set from `expect()`;
  - trigger an error for each of consecutive assertion in the same test block.
- `remaining`: if you call `expect(n)`, this will receive a number value with the remaining tests to run.
- `error`: push an error to the test log

### Logs

- `assertions`: the executed assertions
- `passed`: the passing assertions
- `failed`: the failing assertions

## The Logger

You can set a different logger on **Goiabada**. It's not standardized yet but my goal is to follow the possible conventions from https://github.com/js-reporters/js-reporters
