import Assert from "./assert.js";
import Logger from "./logger.js";

export default class Goiabada {
    constructor() {
        this.line = [];
        this.logger = new Logger();

        this.runner = function *runner() {
            var count = 0;

            while( this.line.length ) {
                count++;
                yield this.run( this.line.shift() );
            }

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
        this.line.push( { name, callback } );
        if ( !this.running ) {
            this.running = this.runner();
            this.running.next();
        }

        return this.running;
    }
}
