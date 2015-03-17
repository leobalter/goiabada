import Assert from "./assert.js";
import Logger from "./logger.js";

var running;

function run() {
    var { logger, queue } = this,
        { name, callback, testResolve } = queue.shift();

    return new Promise( ( resolve, reject ) => {
            var assert = new Assert( logger, resolve, reject );

            logger.testStart( name );

            try {
                callback( assert );
            } catch( error ) {
                assert.error( `uncaught error: ${ error }` );
            }
        }).then( assert => {
            this.logger.testEnd( assert );
            testResolve( assert );
            running.next();
            return assert;
        });
}

function *runner() {
    while( this.queue.length ) {
        yield run.call( this );
    }

    // TODO: tell logger tests are done
}

export default class Goiabada {
    constructor( logger = new Logger() ) {
        this.queue = [];
        this.logger = logger;
    }

    test( name, callback ) {
        return new Promise( testResolve => {
                this.queue.push( { name, callback, testResolve } );
            });
    }

    start() {
        if ( !running ) {
            console.log( "Running tests...\n" );
            running = runner.call( this );
            run.call( this );
        }
    }
}
