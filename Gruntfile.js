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
        browserify: {
            options: {
                transform: [ "babelify" ]
            },
            dist: {
                files: {
                    "build/goiabada.browser.js": "lib/goiabada.js"
                }
            },
            test: {
                files: {
                    "build/tests/browser.js": "tests/index.js"
                }
            }
        },
        watch: {
            all: {
                files: SOURCE,
                tasks: [ "default" ]
            }
        }
    });

    grunt.registerTask( "default", [ "jshint", "jscs", "browserify" ] );
};
