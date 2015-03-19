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
            testResolve( assert );
            return assert;
        }).then( assert => {
            this.logger.testEnd( assert );
            return assert;
        }).then( assert => {
            running.next();
            return assert;
        });
}

function *runner() {
    while( this.queue.length ) {
        yield run.call( this );
    }

    this.logger.done( this.log );

    process.exit( this.log.failed );
}

export default class Goiabada {
    constructor( logger = new Logger() ) {
        this.queue = [];
        this.log = {
            passed: 0,
            failed: 0,
            tests: []
        };
        this.logger = logger;
    }

    test( name, callback ) {
        return new Promise( testResolve => {
                this.queue.push( { name, callback, testResolve } );
            }).then( assert => {
                this.log.passed += assert.passed.length;
                this.log.failed += assert.failed.length;
                this.log.tests.push( assert );

                return assert;
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
