/*globals process*/
import chalk from "chalk";

export default class Logger {
    testStart( name ) {
        process.stdout.write( `${name} ` );
    }

    testEnd({ passed, assertions, failed }) {
        if ( failed.length ) {
            process.stdout.write( chalk.bold.red(
                `\n${ failed.length } from ${ assertions.length } failed\n`
            ));
        } else {
            process.stdout.write( chalk.green.bold(
                ` \u2605\n`
            ) );
        }
    }

    assertion({ result, message }) {
        if ( result ) {
            // Verbose:
            // process.stdout.write( chalk.green( `  ${ message }\n` ));
            process.stdout.write( chalk.green( '.' ) );
        } else {
            process.stdout.write( chalk.red( `\n  ${ message }\n` ));
        }
    }

    done() {
        process.stdout.write( chalk.bold( "\nFinished tests queue\n\n" ) );
    }

    error( ...args ) {
        for ( let item of args ) {
            process.stdout.write( chalk.red.bold( `\n ${item}` ) );
        }
    }
}
