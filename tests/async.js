export default ( test ) => {
    test( "async", t => {
        t.expect( 2 );
        setTimeout( () => {
            t.ok( true, "async assertion 2" );
            t.end();
        }, 26 );
        setTimeout( () => {
            t.ok( true, "async assertion 1" );
        }, 13 );
    });
}
