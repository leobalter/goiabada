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

    assertion({ passed, description }) {
        description = description || "anonymous assertion";
        if ( passed ) {
            console.log( chalk.green( `  ${ description }` ));
        } else {
            console.error( chalk.red( `  ${ description }` ));
        }
    }

    error( ...args ) {
        for ( var item of args ) {
            console.error( chalk.red.bold( item ) );
        }
    }
}
