(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Assert = (function () {
    function Assert(logger) {
        _classCallCheck(this, Assert);

        this.assertions = [];
        this.passed = [];
        this.failed = [];
        this.logger = logger;
        this.date = Date.now();
    }

    _prototypeProperties(Assert, null, {
        expect: {
            value: function expect(n) {
                this.remaining = n;
            },
            writable: true,
            configurable: true
        },
        run: {
            value: function run(callback) {
                var assert = this;
                return new Promise(function (resolve, reject) {
                    assert.resolve = resolve;
                    assert.reject = reject;
                    callback(assert);
                });
            },
            writable: true,
            configurable: true
        },
        end: {
            value: function end(forcedFail) {
                if (this.remaining) {
                    this.error("Ended with remaining expected assertions");
                }

                if (forcedFail === false) {
                    this.reject(this);
                } else {
                    this.resolve(this);
                }
            },
            writable: true,
            configurable: true
        },
        ok: {
            value: function ok(value, description) {
                var result = !!value;

                this.register("ok", result, description, value, true);

                return !!result;
            },
            writable: true,
            configurable: true
        },
        equal: {
            value: function equal(value, expected, description) {
                var result = value == expected;

                this.register("equal", result, description, value, expected);

                return !!result;
            },
            writable: true,
            configurable: true
        },
        same: {
            value: function same(value, expected, description) {
                var result = value === expected;

                this.register("same", result, description, value, expected);

                return !!result;
            },
            writable: true,
            configurable: true
        },
        error: {
            value: function error(message) {
                this.logger.error(message);
                this.failed.push({ message: message });
            },
            writable: true,
            configurable: true
        },
        throws: {
            value: function throws(fn, description) {
                var error,
                    result = false;

                try {
                    fn();
                } catch (e) {
                    error = e;
                    result = true;
                }

                this.register("throws", result, description);

                return error;
            },
            writable: true,
            configurable: true
        },
        register: {
            value: function register(method, passed, description, actual, expected) {
                var assert = {
                    method: method,
                    passed: passed,
                    description: description,
                    actual: actual,
                    expected: expected
                };

                this.assertions.push(assert);
                this[passed ? "passed" : "failed"].push(assert);
                this.logger.assertion(assert);

                if (this.remaining) {
                    this.remaining--;
                    if (this.remaining === 0) {
                        this.end();
                    }
                    if (this.remaining < 0) {
                        this.logger.error("More assertions than expected");
                        passed = false;
                    }
                }
            },
            writable: true,
            configurable: true
        }
    });

    return Assert;
})();

module.exports = Assert;

},{}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Assert = _interopRequire(require("./assert.js"));

var Logger = _interopRequire(require("./logger.js"));

var Goiabada = (function () {
    function Goiabada() {
        _classCallCheck(this, Goiabada);

        this.queue = [];
        this.logger = new Logger();

        this.runner = regeneratorRuntime.mark(function runner() {
            var _this = this;

            var count;
            return regeneratorRuntime.wrap(function runner$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        count = 0;

                    case 1:
                        if (!_this.queue.length) {
                            context$3$0.next = 8;
                            break;
                        }

                        count++;
                        _this.resolve(_this.run(_this.queue.shift()));
                        context$3$0.next = 6;
                        return count++;

                    case 6:
                        context$3$0.next = 1;
                        break;

                    case 8:
                        return context$3$0.abrupt("return", count);

                    case 9:
                    case "end":
                        return context$3$0.stop();
                }
            }, runner, this);
        });
    }

    _prototypeProperties(Goiabada, null, {
        run: {
            value: function run(_ref) {
                var name = _ref.name;
                var callback = _ref.callback;

                var assert,
                    running = this.running,
                    logger = this.logger;

                logger.testStart(name);

                assert = new Assert(logger);

                return assert.run(callback).then(function (assert) {
                    logger.testEnd(assert);
                    running.next();
                });
            },
            writable: true,
            configurable: true
        },
        test: {
            value: function test(name, callback) {
                var _this = this;

                this.queue.push({ name: name, callback: callback });

                var promise = new Promise(function (resolve) {
                    _this.resolve = resolve;
                });

                if (!this.running) {
                    this.running = this.runner();
                    this.running.next();
                }

                return promise;
            },
            writable: true,
            configurable: true
        }
    });

    return Goiabada;
})();

module.exports = Goiabada;

// TODO: tell logger tests are done

},{"./assert.js":1,"./logger.js":3}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var chalk = _interopRequire(require("chalk"));

var Logger = (function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _prototypeProperties(Logger, null, {
        testStart: {
            value: function testStart(name) {
                console.log(chalk.bold("Test: " + name));
            },
            writable: true,
            configurable: true
        },
        testEnd: {
            value: function testEnd(_ref) {
                var passed = _ref.passed;
                var assertions = _ref.assertions;
                var failed = _ref.failed;

                if (failed.length) {
                    console.error(chalk.bold.red("" + failed.length + " from " + assertions.length + " failed\n"));
                } else {
                    console.log(chalk.yellow("" + passed.length + " from " + assertions.length + " passed\n"));
                }
            },
            writable: true,
            configurable: true
        },
        assertion: {
            value: function assertion(_ref) {
                var passed = _ref.passed;
                var description = _ref.description;

                description = description || "anonymous assertion";
                if (passed) {
                    console.log(chalk.green("  " + description));
                } else {
                    console.error(chalk.red("  " + description));
                }
            },
            writable: true,
            configurable: true
        },
        error: {
            value: function error() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                for (var _iterator = args[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                    var item = _step.value;

                    console.error(chalk.red.bold(item));
                }
            },
            writable: true,
            configurable: true
        }
    });

    return Logger;
})();

module.exports = Logger;

},{"chalk":4}],4:[function(require,module,exports){
'use strict';
var escapeStringRegexp = require('escape-string-regexp');
var ansiStyles = require('ansi-styles');
var stripAnsi = require('strip-ansi');
var hasAnsi = require('has-ansi');
var supportsColor = require('supports-color');
var defineProps = Object.defineProperties;
var chalk = module.exports;

function build(_styles) {
	var builder = function builder() {
		return applyStyle.apply(builder, arguments);
	};
	builder._styles = _styles;
	// __proto__ is used because we must return a function, but there is
	// no way to create a function with a different prototype.
	builder.__proto__ = proto;
	return builder;
}

var styles = (function () {
	var ret = {};

	ansiStyles.grey = ansiStyles.gray;

	Object.keys(ansiStyles).forEach(function (key) {
		ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

		ret[key] = {
			get: function () {
				return build(this._styles.concat(key));
			}
		};
	});

	return ret;
})();

var proto = defineProps(function chalk() {}, styles);

function applyStyle() {
	// support varags, but simply cast to string in case there's only one arg
	var args = arguments;
	var argsLen = args.length;
	var str = argsLen !== 0 && String(arguments[0]);
	if (argsLen > 1) {
		// don't slice `arguments`, it prevents v8 optimizations
		for (var a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!chalk.enabled || !str) {
		return str;
	}

	/*jshint validthis: true*/
	var nestedStyles = this._styles;

	for (var i = 0; i < nestedStyles.length; i++) {
		var code = ansiStyles[nestedStyles[i]];
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;
	}

	return str;
}

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		ret[name] = {
			get: function () {
				return build([name]);
			}
		};
	});

	return ret;
}

defineProps(chalk, init());

chalk.styles = ansiStyles;
chalk.hasColor = hasAnsi;
chalk.stripColor = stripAnsi;
chalk.supportsColor = supportsColor;

// detect mode if not set manually
if (chalk.enabled === undefined) {
	chalk.enabled = chalk.supportsColor;
}

},{"ansi-styles":5,"escape-string-regexp":6,"has-ansi":7,"strip-ansi":9,"supports-color":11}],5:[function(require,module,exports){
'use strict';
var styles = module.exports;

var codes = {
	reset: [0, 0],

	bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
	dim: [2, 22],
	italic: [3, 23],
	underline: [4, 24],
	inverse: [7, 27],
	hidden: [8, 28],
	strikethrough: [9, 29],

	black: [30, 39],
	red: [31, 39],
	green: [32, 39],
	yellow: [33, 39],
	blue: [34, 39],
	magenta: [35, 39],
	cyan: [36, 39],
	white: [37, 39],
	gray: [90, 39],

	bgBlack: [40, 49],
	bgRed: [41, 49],
	bgGreen: [42, 49],
	bgYellow: [43, 49],
	bgBlue: [44, 49],
	bgMagenta: [45, 49],
	bgCyan: [46, 49],
	bgWhite: [47, 49]
};

Object.keys(codes).forEach(function (key) {
	var val = codes[key];
	var style = styles[key] = {};
	style.open = '\u001b[' + val[0] + 'm';
	style.close = '\u001b[' + val[1] + 'm';
});

},{}],6:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe,  '\\$&');
};

},{}],7:[function(require,module,exports){
'use strict';
var ansiRegex = require('ansi-regex');
var re = new RegExp(ansiRegex().source); // remove the `g` flag
module.exports = re.test.bind(re);

},{"ansi-regex":8}],8:[function(require,module,exports){
'use strict';
module.exports = function () {
	return /\u001b\[(?:[0-9]{1,3}(?:;[0-9]{1,3})*)?[m|K]/g;
};

},{}],9:[function(require,module,exports){
'use strict';
var ansiRegex = require('ansi-regex')();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

},{"ansi-regex":10}],10:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],11:[function(require,module,exports){
(function (process){
'use strict';
module.exports = (function () {
	if (process.argv.indexOf('--no-color') !== -1) {
		return false;
	}

	if (process.argv.indexOf('--color') !== -1) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();

}).call(this,require('_process'))
},{"_process":12}],12:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2]);
