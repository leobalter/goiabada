class Assert {
    constructor( logger ) {
        this.assertions = [];
        this.passed = [];
        this.failed = [];
        this.logger = logger;
        this.date = Date.now();
    }

    expect( n ) {
        this.remaining = n;
    }

    run( callback ) {
        var assert = this;
        return new Promise( ( resolve, reject ) => {
            assert.resolve = resolve;
            assert.reject = reject;
            callback( assert );
        });
    }

    end( forcedFail ) {
        if ( this.remaining ) {
            this.error( "Ended with remaining expected assertions" );
        }

        if ( forcedFail === false ) {
            this.reject( this );
        } else {
            this.resolve( this );
        }
    }

    ok( value, message = `${value} is equivalent to true` ) {
        var result = !!value;

        this.register( "ok", result, message, value, true );

        return !!result;
    }

    equal( value, expected, message = `${value} is equal to ${expected}` ) {
        var result = value == expected;

        this.register( "equal", result, message, value, expected );

        return !!result;
    }

    same( value, expected, message = `${value} is strict equal to ${expected}` ) {
        var result = value === expected;

        this.register( "same", result, message, value, expected );

        return !!result;
    }

    error( message ) {
        this.logger.error( message );
        this.failed.push({ message });
    }

    throws( fn, message = `${fn} throws an error` ) {
        var error,
            result = false;

        try {
            fn();
        } catch( e ) {
            error = e;
            result = true;
        }

        this.register( "throws", result, message );

        return error;
    }

    register( method, passed, message, actual, expected ) {
        var assert = {
                method,
                passed,
                message,
                actual,
                expected
            };

        this.assertions.push( assert );
        this[ passed ? "passed" : "failed" ].push( assert );
        this.logger.assertion( assert );

        if ( this.remaining ) {
            this.remaining--;
            if ( this.remaining === 0 ) {
                this.end();
            }
            if ( this.remaining < 0 ) {
                this.logger.error( "More assertions than expected" );
                passed = false;
            }
        }
    }
}

export default Assert;
