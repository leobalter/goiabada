import Goiabada from "../index.js";
import assertions from "./assertions.js";
import async from "./async.js";
import failing from "./failing.js";

var goiabada = new Goiabada();
var test = goiabada.test.bind( goiabada );

assertions( test );
async( test );
failing( test );
async( test );

goiabada.start();
