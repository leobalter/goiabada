import Assert from "./assert.js";
import Logger from "./logger.js";

var running;

function run() {
    var { logger, queue } = this;
    var { name, callback, testResolve } = queue.shift();
    var assert;

    return new Promise( ( resolve, reject ) => {
            logger.testStart( name );

            assert = new Assert( logger, resolve, reject );

            try {
                callback( assert );
            } catch( error ) {
                assert.error( `uncaught error: ${ error }` );
            }
        }).then( () => {
            testResolve( assert );
        }).then( () => {
            this.logger.testEnd( assert );
        }).then( () => {
            running.next();
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
