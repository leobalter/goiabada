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
        watch: {
            all: {
                files: SOURCE,
                tasks: ["default"]
            }
        }
    });

    grunt.registerTask("default", ["jshint", "jscs"]);
};