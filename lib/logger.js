import chalk from "chalk";
import Reporter from "stdout-reporter";

export default class Logger {
    constructor() {
        this.reporter = new Reporter();
    }

    testStart( name ) {
        this.reporter.testStart( { name } );
    }

    testEnd( details ) {
        this.reporter.testDone( details );
    }

    assertion( details ) {
        this.reporter.assertion( details );
    }

    done( details ) {
        details.total = details.passed + details.failed;
        details.runtime = "N/A ";
        this.reporter.done( details );
    }

    error( ...args ) {
        for ( let item of args ) {
            process.stderr.write( chalk.red.bold( `\n ${item}` ) );
        }
    }
}
