export default ( test ) => {
    test( "basic API", t => {
        var obj = { foo: "foo" };

        t.ok( true, "ok assertion pass" );
        t.ok( "foo" );
        t.ok( 7 );

        t.equal( 1, "1", "equal assertion pass" );
        t.equal( "foo", "foo" );

        t.same( obj, obj );
        t.same( 2, 2, "same assertion pass" );

        t.throws( () => {
            throw "foo";
        });

        t.throws( () => {
            throw "foo";
        }, "throws foo");

        t.notOk( false, "falsy value pass" );
        t.notOk( 0 );
        t.notOk( "" );

        t.notEqual( 1, 2 );
        t.notEqual( "foo", "bar", "foo is not bar" );

        t.notSame( 1, "foo" );
        t.notSame( 1, "1", "1 is not \"1\"" );

        t.end();
    });
};
