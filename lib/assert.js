import { isEqual } from "lodash";

var resolve, reject, logger;

class Assert {
    constructor( log, res, rej ) {
        this.assertions = [];
        this.passed = [];
        this.failed = [];
        logger = log;
        resolve = res;
        reject = rej;
    }

    expect( n ) {
        this.remaining = n;
    }

    end( forcedFail ) {
        if ( this.remaining ) {
            this.error( "Ended with remaining expected assertions" );
        }

        if ( forcedFail === false ) {
            reject( this );
        } else {
            resolve( this );
        }

    }

    push( method, passed, message, actual, expected ) {
        var assert = {
                method,
                passed,
                message,
                actual,
                expected
            };

        this.assertions.push( assert );
        this[ passed ? "passed" : "failed" ].push( assert );
        logger.assertion( assert );

        if ( this.remaining ) {
            this.remaining--;
            if ( this.remaining === 0 ) {
                this.end();
            } else if ( this.remaining < 0 ) {
                this.error( "More assertions than expected" );
            }
        }

        return passed;
    }

    ok( value, message = `${value} evaluates to true` ) {
        var result = Boolean( value );

        return this.push( "ok", result, message, value, true );
    }

    notOk( value, message = `${value} evaluates to false` ) {
        var result = !value;

        return this.push( "ok", result, message, value, false );
    }

    equal( value, expected, message = `${value} is equal to ${expected}` ) {
        var result = value == expected;

        return this.push( "equal", result, message, value, expected );
    }

    notEqual( value, expected, message = `${value} is not equal to ${expected}` ) {
        var result = value != expected;

        return this.push( "equal", result, message, value, expected );
    }

    same( value, expected, message = `${value} is strict equal to ${expected}` ) {
        var result = value === expected;

        return this.push( "same", result, message, value, expected );
    }

    notSame( value, expected, message = `${value} is not strict equal to ${expected}` ) {
        var result = value !== expected;

        return this.push( "same", result, message, value, expected );
    }

    deepEqual( value, expected, message = `${value} is deep equal to ${expected}` ) {
        var result = isEqual( value, expected );

        return this.push( "deepEqual", result, message, value, expected );
    }

    notDeepEqual( value, expected, message = `${value} is not deep equal to ${expected}` ) {
        var result = !isEqual( value, expected );

        return this.push( "notDeepEqual", result, message, value, expected );
    }

    throws( fn, message = `${fn.name} throws an error` ) {
        var error,
            result = false;

        message = message.trim();

        try {
            fn();
        } catch( e ) {
            error = e;
            result = true;
        }

        this.push( "throws", result, message );

        return error;
    }

    error( message ) {
        logger.error( message );
        this.failed.push({ message });
    }
}

export default Assert;
