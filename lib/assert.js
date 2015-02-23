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

    ok( value, description = `${value} is equivalent to true` ) {
        var result = !!value;

        this.register( "ok", result, description, value, true );

        return !!result;
    }

    equal( value, expected, description = `${value} is equal to ${expected}` ) {
        var result = value == expected;

        this.register( "equal", result, description, value, expected );

        return !!result;
    }

    same( value, expected, description = `${value} is strict equal to ${expected}` ) {
        var result = value === expected;

        this.register( "same", result, description, value, expected );

        return !!result;
    }

    error( message ) {
        this.logger.error( message );
        this.failed.push({ message });
    }

    throws( fn, description = `${fn} throws an error` ) {
        var error,
            result = false;

        try {
            fn();
        } catch( e ) {
            error = e;
            result = true;
        }

        this.register( "throws", result, description );

        return error;
    }

    register( method, passed, description, actual, expected ) {
        var assert = {
                method,
                passed,
                description,
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
