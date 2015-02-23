import chalk from "chalk";

export default class Logger {
    testStart( name ) {
        console.log( chalk.bold( "Test: " + name ) );
    }

    testEnd({ passed, assertions, failed }) {
        if ( failed.length ) {
            console.error( chalk.bold.red( `${ failed.length } from ${ assertions.length } failed\n` ) );
        } else {
            console.log( chalk.yellow( `${ passed.length } from ${ assertions.length } passed\n` ) );
        }
    }

    assertion({ passed, message }) {
        message = message || "anonymous assertion";
        if ( passed ) {
            console.log( chalk.green( `  ${ message }` ));
        } else {
            console.error( chalk.red( `  ${ message }` ));
        }
    }

    error( ...args ) {
        for ( var item of args ) {
            console.error( chalk.red.bold( item ) );
        }
    }
}
