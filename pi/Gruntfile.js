/*global module:false*/
module.exports = function (grunt) {
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-execute');
    
    // Default task.
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['ts']);
    grunt.registerTask('server', ['express:dev', 'watch']);
    grunt.registerTask('dump', ['ts:dump', 'execute:dump']);
    
    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        express: {
            dev: {
                options: {
                    script: 'src/app.js'
                }
            }
        },
        watch: {
            express: {
                files: [ 'src/**/*.js' ],
                tasks: [ 'express:dev' ],
                options: {
                    spawn: false
                }
            },
            // Reload grunt config when Gruntfile.js is changed
            gruntFile: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },
        ts: {
            build: {
                src: ["src/**/*.ts"],
                options: {
                    // 'es3' (default) | 'es5'
                    target: 'es5',
                    // 'amd' (default) | 'commonjs'
                    module: 'commonjs',
                    // true (default) | false
                    sourceMap: false,
                    // true | false (default)
                    declaration: false,
                    // true (default) | false
                    removeComments: true
                }
            },
            dump: {
                src: ["dump/**/*.ts"],
                options: {
                    // 'es3' (default) | 'es5'
                    target: 'es5',
                    // 'amd' (default) | 'commonjs'
                    module: 'commonjs',
                    // true (default) | false
                    sourceMap: false,
                    // true | false (default)
                    declaration: false,
                    // true (default) | false
                    removeComments: true
                }
            }
        },
        execute: {
            dump: {
                src: ['dump/dump.js']
            }
        }
    });
};
