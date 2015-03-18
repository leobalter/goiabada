export default ( test ) => {
    function invertResults( t ) {
        var originalPush = t.push;

        t.push = function( assert ) {
            assert.result = !assert.result;

            originalPush.call( t, assert );
        };

        return () => {
                t.push = originalPush;
            };
    }

    test( "failing ok", t => {
        var revert = invertResults( t );

        t.ok( false );
        t.ok( 0 );
        t.ok( "" );
        t.ok( null );
        t.ok( NaN );
        t.ok();

        revert();

        t.end();
    });

    test( "failing notOk", t => {
        var revert = invertResults( t );

        t.notOk( true );
        t.notOk( 1 );
        t.notOk( "foo" );
        t.notOk( {} );
        t.notOk( [] );

        revert();

        t.end();
    });

    test( "failing equal", t => {
        var revert = invertResults( t );

        t.equal( true, false );
        t.equal( 1, 0 );
        t.equal( "foo", "bar" );
        t.equal( {}, [] );
        t.equal( {}, {} );
        t.equal( [ "foo" ] , [ "foo" ] );

        revert();

        t.end();
    });

    test( "failing notEqual", t => {
        var revert = invertResults( t );

        t.notEqual( true, true );
        t.notEqual( 1, 1 );
        t.notEqual( "1", 1 );
        t.notEqual( "foo", "foo" );

        revert();

        t.end();
    });

    test( "failing same", t => {
        var revert = invertResults( t );

        t.same( 1, "1" );
        t.same( [ "foo" ] , [ "foo" ] );

        revert();

        t.end();
    });

    test( "failing notSame", t => {
        var revert = invertResults( t );

        var foo = [ 1, 2, 4 ];

        t.notSame( null, null );
        t.notSame( "1", "1" );
        t.notSame( foo, foo );

        revert();

        t.end();
    });

    test( "failing deepEqual", t => {
        var revert = invertResults( t );

        t.deepEqual(
            [ "foo", {
                bar: null
            }],
            [ "foo", "bar" ]
        );

        revert();

        t.end();
    });

    test( "failing notDeepEqual", t => {
        var revert = invertResults( t );

        t.notDeepEqual( [ "foo" ] , [ "foo" ] );

        t.notDeepEqual(
            [ "foo", {
                bar: "baz"
            }],
            [ "foo", { bar: "baz" } ]
        );

        revert();

        t.end();
    });

    test( "failing throws", t => {
        var revert = invertResults( t );

        t.throws( () => { return "foo"; } );

        revert();

        t.end();
    });
};
