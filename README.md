# Goiabada

This is an experimental project with a very simple (and incomplete) unit tests tool written using ES6 features.

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

Import goiabada and instance a new object:

```js
import Goiabada from "goiabada";

var goiabada = new Goiabada();
```

Write your tests using the `test` method, catch the `assert` parameter and write your assertions, call `end()` when you're done testing.

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

### API

#### Assertions:

- `ok( value[, message ] )`: pass when the value is truthy.
  Returns the result.
- `equal( value, expected[, message ] )`: non strict comparison (`==`).
  Returns the result.
- `same( value, expected[, message ] )`: strict comparison (`===`).
  Returns the result.
- `throws( fn[, message ] )`: passes when the given fn throws an error.
  Returns the error.

#### Helpers

- `expect( n )`: expects a number of given assertions to run from that point.
  The last expected assertion will trigger the `end()` method.
- `end()`: when triggered manually will close the test in order the to run the following.
  It will trigger an error if you still have remaining tests set from `expect()`.
  It will also trigger an error for each of consecutive assertion in the same test block.
- `remaining`: if you call `expect(n)`, this will receive a number value with the remaining tests to run.
- `error`: push an error to the test log

#### Logs

- `assertions`: the executed assertions
- `passed`: the passing assertions
- `failed`: the failing assertions

### The Logger

You can set a different logger on **Goiabada**. It's not standardized yet but my goal is to follow the possible conventions from https://github.com/js-reporters/js-reporters
