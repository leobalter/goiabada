var resolve, reject, logger;

function register( method, passed, message, actual, expected ) {
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
}

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

    ok( value, message = `${value} evaluates to true` ) {
        var result = Boolean( value );

        register.call( this, "ok", result, message, value, true );

        return !!result;
    }

    notOk( value, message = `${value} evaluates to false` ) {
        var result = !value;

        register.call( this, "ok", result, message, value, false );

        return !!result;
    }

    equal( value, expected, message = `${value} is equal to ${expected}` ) {
        var result = value == expected;

        register.call( this, "equal", result, message, value, expected );

        return !!result;
    }

    notEqual( value, expected, message = `${value} is not equal to ${expected}` ) {
        var result = value != expected;

        register.call( this, "equal", result, message, value, expected );

        return !!result;
    }

    same( value, expected, message = `${value} is strict equal to ${expected}` ) {
        var result = value === expected;

        register.call( this, "same", result, message, value, expected );

        return !!result;
    }

    notSame( value, expected, message = `${value} is not strict equal to ${expected}` ) {
        var result = value !== expected;

        register.call( this, "same", result, message, value, expected );

        return !!result;
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

        register.call( this, "throws", result, message );

        return error;
    }

    error( message ) {
        logger.error( message );
        this.failed.push({ message });
    }
}

export default Assert;
