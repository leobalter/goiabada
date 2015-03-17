import Goiabada from "../index.js";

var goiabada = new Goiabada();
var test = goiabada.test.bind( goiabada );

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
}).then( () => {
    console.log( "test 1" );
});

test( "async", t => {
    t.expect( 2 );
    setTimeout( () => {
        t.ok( true, "async assertion 2" );
        t.end();
    }, 26 );
    setTimeout( () => {
        t.ok( true, "async assertion 1" );
    }, 13 );
}).then( () => {
    console.log( "test 2" );
});


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
}).then( () => {
    console.log( "test 3" );
});

test( "async", t => {
    t.expect( 2 );
    setTimeout( () => {
        t.ok( true, "async assertion 2" );
        t.end();
    }, 26 );
    setTimeout( () => {
        t.ok( true, "async assertion 1" );
    }, 13 );
}).then( () => {
    console.log( "test 4" );
});

test( "throws and error", t => {
    t.end();
    throw "foo";
}).then( () => {
    console.log( "test 5" );
});

goiabada.start();
