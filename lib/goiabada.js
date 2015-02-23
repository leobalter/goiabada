import Assert from "./assert.js";
import Logger from "./logger.js";

var running, resolve;

function run() {
    var assert,
        { logger, queue } = this,
        { name, callback } = queue.shift();

    logger.testStart( name );

    assert = new Assert( logger );

    return assert
        .run( callback )
        .then( assert => {
            logger.testEnd( assert );
            running.next();

            return assert;
        });
}

function *runner() {
    var count = 0;

    while( this.queue.length ) {
        yield resolve( run.call( this ) );
        count++;
    }

    // TODO: tell logger tests are done
}

export default class Goiabada {
    constructor() {
        this.queue = [];
        this.logger = new Logger();
    }

    test( name, callback ) {
        this.queue.push( { name, callback } );

        var promise = new Promise( r => {
            resolve = r;
        });

        if ( !running ) {
            console.log( "Running tests...\n" );
            running = runner.call( this );
            runner.call( this ).next();
        }

        return promise;
    }
}
