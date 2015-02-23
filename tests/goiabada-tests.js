import Goiabada from "../index.js";

var test = Goiabada.prototype.test.bind( new Goiabada() );

test( "basic API", t => {
    t.ok( true, "ok assertion pass" );
    t.ok( "foo" );
    t.equal( 1, "1", "equal assertion pass" );
    t.same( 2, 2, "same assertion pass" );
    t.throws( () => {
        throw "foo";
    });

    t.end();
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
}).then( t => {
    t.ok( true, "tests are promiseable" );
});

test( "basic API with failing tests", t => {
    t.expect( 2 );
    t.ok( false, "ok assertion pass" );
    t.equal( 1, 2, "equal assertion pass" );
    t.same( 2, "2", "same assertion pass" );
    t.throws( () => {
        return "foo";
    });
});

