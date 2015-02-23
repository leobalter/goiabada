import Assert from "./assert.js";
import Logger from "./logger.js";

var running, resolve;

function run() {
    var { logger, queue } = this,
        { name, callback } = queue.shift();

    logger.testStart( name );

    return new Promise( ( resolve, reject ) => {
            var assert = new Assert( logger, resolve, reject );

            try {
                callback( assert );
            } catch( error ) {
                assert.error( `uncaught error: ${ error }` );
            }
        }).then( assert => {
            logger.testEnd( assert );
            running.next();

            return assert;
        });
}

function *runner() {
    var count = 0;

    while( this.queue.length ) {
        count += 1;
        yield resolve( run.call( this ) );
    }

    // TODO: tell logger tests are done
}

export default class Goiabada {
    constructor( logger = new Logger() ) {
        this.queue = [];
        this.logger = logger;
    }

    test( name, callback ) {
        this.queue.push( { name, callback } );

        var promise = new Promise( r => {
            resolve = r;
        });

        if ( !running ) {
            console.log( "Running tests...\n" );
            running = runner.call( this );
            running.next();
        }

        return promise;
    }
}
