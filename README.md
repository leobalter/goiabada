# Goiabada

This is an experimental project providing a very simple (and incomplete) unit test tool written using ES6 features.

[![Code Climate](https://codeclimate.com/github/leobalter/goiabada/badges/gpa.svg)](https://codeclimate.com/github/leobalter/goiabada)

![goiaba](https://cloud.githubusercontent.com/assets/301201/6330134/e3237ddc-bb43-11e4-89c1-169637aa7108.jpg)

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

If you prefer calling only `test`, without the namespace, you can add this line:

```js
var test = goiabada.test.bind( goiabada );
```

### Browser

Goiabada uses a Browserify build for browser usage.

TODO: more documentation on that

## API

### Assertions:

- `ok( value[, message ] )`: evaluates the value to true. e.g.: `true`, `1` or `"non-empty string"`.
  - Returns the result.
- `notOk( value[, message ] )`: evaluates the value to false.
  - Returns the result.
- `equal( value, expected[, message ] )`: non strict comparison (`==`).
  - Returns the result.
- `notEqual( value, expected[, message ] )`: negative non strict comparison (`!=`).
  - Returns the result.
- `same( value, expected[, message ] )`: strict comparison (`===`).
  - Returns the result.
- `notSame( value, expected[, message ] )`: negative strict comparison (`!==`).
  - Returns the result.
- `throws( fn[, message ] )`: passes when the given fn throws an error.
  - Returns the error.

### Helpers

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
