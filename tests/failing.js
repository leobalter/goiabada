export default ( test ) => {
    test( "basic API with failing tests", t => {
        t.expect( 2 );
        t.ok( false, "ok assertion pass" );
        t.end();
        t.equal( 1, 2, "equal assertion pass" );
        t.same( 2, "2", "same assertion pass" );
        t.throws( () => {
            return "foo";
        });
        t.error( "custom assertion error" );
        t.end( false );
    });

    test( "throws and error", t => {
        t.end();
        throw "foo";
    });
};
