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

    push( assert ) {
        var { result } = assert;

        this.assertions.push( assert );

        this[ result ? "passed" : "failed" ].push( assert );

        logger.assertion( assert );

        if ( this.remaining ) {
            this.remaining--;
            if ( this.remaining === 0 ) {
                this.end();
            } else if ( this.remaining < 0 ) {
                this.error( "More assertions than expected" );
            }
        }

        return result;
    }

    ok( value, message = `${value} evaluates to true` ) {
        var assert = {
                method: "ok",
                result: Boolean( value ),
                message, value
            };

        return this.push( assert );
    }

    notOk( value, message = `${value} evaluates to false` ) {
        var assert = {
                method: "notOk",
                result: !Boolean( value ),
                message, value
            };

        return this.push( assert );
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

        this.push( { method: "throws", result, message, fn } );

        return error;
    }

    error( message ) {
        logger.error( message );
        this.failed.push({ message });
    }
}

var methods = new Map()
        .set( "equal", {
            res: ( value, expected ) => { return value == expected; },
            msg: "is equal to"
        })
        .set( "notEqual", {
            res: ( value, expected ) => { return value != expected; },
            msg: "is not equal to"
        })
        .set( "same", {
            res: ( value, expected ) => { return value === expected; },
            msg: "is strict equal to"
        })
        .set( "notSame", {
            res: ( value, expected ) => { return value !== expected; },
            msg: "is not strict equal to"
        })
        .set( "deepEqual", {
            res: isEqual,
            msg: "is deep equal to"
        })
        .set( "notDeepEqual", {
            res: ( value, expected ) => { return !isEqual( value, expected ); },
            msg: "is not deep equal to"
        });

methods.forEach( ( { res, msg }, method ) => {
    Assert.prototype[ method ] =
        function( value, expected, message = `${value} ${msg} ${expected}` ) {
            var result = res( value, expected );

            return this.push({ method, result, message, value, expected });
        };
});

export default Assert;
