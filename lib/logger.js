import chalk from "chalk";

const write = process.stdout.write.bind( process.stdout );

export default class Logger {
    testStart( name ) {
        write( `${name} ` );
    }

    testEnd({ passed, assertions, failed }) {
        if ( failed.length ) {
            write( chalk.bold.red(
                `\n${ failed.length } from ${ assertions.length } failed\n`
            ));
        } else {
            write( chalk.green.bold(
                ` \u2605\n`
            ));
        }
    }

    assertion({ result, message }) {
        if ( result ) {
            // Verbose:
            // write( chalk.green( `  ${ message }\n` ));
            write( chalk.green( '.' ) );
        } else {
            write( chalk.red( `\n  ${ message }\n` ));
        }
    }

    done( log ) {
        let length = log.tests.length;
        let { passed, failed } = log;

        write( "\n" );

        if ( passed && !failed ) {
            write( chalk.bold.green(
                `${passed} assertions from ${length} tests passed!`
            ));
        } else if ( !passed && !failed ) {
            write( chalk.bold.yellow( "No assertions to test" ) );
        } else {
            write( chalk.bold.red(
                `from ${length} tests, ${failed} assertions failed and ${passed} passed`
            ));
        }

        write( chalk.bold( "\nFinished tests queue\n\n" ) );
    }

    error( ...args ) {
        for ( let item of args ) {
            write( chalk.red.bold( `\n ${item}` ) );
        }
    }
}
