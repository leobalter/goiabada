/*jshint node:true*/

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    const SOURCE = [
        "index.js",
        "Gruntfile.js",
        "{lib,tests}/**/*.js"
    ];

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: SOURCE
        },
        jscs: {
            options: {
                config: ".jscsrc",
            },
            all: SOURCE
        },
        babel: {
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    "build/commonjs/goiabada.js": "lib/goiabada.js",
                    "build/commonjs/assert.js": "lib/assert.js",
                    "build/commonjs/logger.js": "lib/logger.js"
                }
            }
        },
        watch: {
            all: {
                files: [ ".jshintrc", SOURCE ],
                tasks: [ "default" ]
            }
        }
    });

    grunt.registerTask( "default", [ "jshint", "jscs", "babel" ] );
};
