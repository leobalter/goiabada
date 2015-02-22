import Assert from "./assert.js";
import Logger from "./logger.js";

export default class Goiabada {
    constructor() {
        this.queue = [];
        this.logger = new Logger();

        this.runner = function *runner() {
            var count = 0;

            while( this.queue.length ) {
                count++;
                this.resolve( this.run( this.queue.shift() ) );
                yield count++;
            }

            // TODO: tell logger tests are done

            return count;
        };
    }

    run({ name, callback }) {
        var assert,
            running = this.running,
            logger = this.logger;

        logger.testStart( name );

        assert = new Assert( logger );

        return assert
            .run( callback )
            .then( assert => {
                logger.testEnd( assert );
                running.next();
            });
    }

    test( name, callback ) {
        this.queue.push( { name, callback } );

        var promise = new Promise( resolve => {
            this.resolve = resolve;
        });

        if ( !this.running ) {
            this.running = this.runner();
            this.running.next();
        }

        return promise;
    }
}
