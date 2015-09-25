/*!
 * Redminportal Docs' Gruntfile
 * http://redminportal.redooor.com
 * Copyright 2013-2015 Redooor LLP
 * Licensed under MIT
 */

module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var configBridge = grunt.file.readJSON('./bower_components/bootstrap/grunt/configBridge.json', {
        encoding: 'utf8'
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        builddir: '.',
        buildtheme: '',
        banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Homepage: <%= pkg.homepage %>\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' * Based on Bootstrap\n' +
            '*/\n',
        clean: {
            docs: 'assets'
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            docs: {
                src: 'develop/js/rdocs.js',
                dest: 'assets/js/rdocs.min.js'
            }
        },
        less: {
            docs: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'rdocs.css.map',
                    sourceMapFilename: 'assets/css/rdocs.css.map'
                },
                src: 'develop/less/rdocs.less',
                dest: 'assets/css/rdocs.css'
            }
        },
        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            docs: {
                options: {
                    map: true
                },
                src: 'assets/css/rdocs.css'
            }
        },
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            docs: {
                src: 'assets/css/rdocs.css',
                dest: 'assets/css/rdocs.min.css'
            }
        },
        copy: {
            bootstrapjs: {
                src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                dest: 'assets/js/bootstrap.min.js'
            },
            bootstrapcss: {
                src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                dest: 'assets/css/bootstrap.min.css'
            },
            bootstrapfonts: {
                expand: true,
                cwd: 'bower_components/bootstrap/fonts/',
                src: '**',
                dest: 'assets/fonts/',
                flatten: true,
                filter: 'isFile'
            },
            fontawesomecss: {
                src: 'bower_components/font-awesome/css/font-awesome.min.css',
                dest: 'assets/css/font-awesome.min.css'
            },
            fontawesomefonts: {
                expand: true,
                cwd: 'bower_components/font-awesome/fonts/',
                src: '**',
                dest: 'assets/fonts/',
                flatten: true,
                filter: 'isFile'
            },
            angularjs: {
                src: 'bower_components/angular/angular.min.js',
                dest: 'assets/js/angular.min.js'
            },
            jqueryjs: {
                src: 'bower_components/jquery/dist/jquery.min.js',
                dest: 'assets/js/jquery.min.js'
            },
			redmaterialsjs: {
                src: 'bower_components/redmaterials/dist/js/redmaterials.min.js',
                dest: 'assets/js/redmaterials.min.js'
            },
            redmaterialscss: {
                src: 'bower_components/redmaterials/dist/css/redmaterials.min.css',
                dest: 'assets/css/redmaterials.min.css'
            }
        },
        watch: {
            files: ['less/**/*.less'],
            tasks: 'default',
            options: {
                livereload: true,
                nospawn: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '.'
                }
            }
        }
    });

    grunt.registerTask('none', function () {});
	
    // Docs task.
    grunt.registerTask('docs-assets', ['copy:bootstrapjs', 'copy:bootstrapcss', 'copy:bootstrapfonts', 'copy:fontawesomecss', 'copy:fontawesomefonts', 'copy:angularjs', 'copy:jqueryjs', 'copy:redmaterialsjs', 'copy:redmaterialscss']);
    grunt.registerTask('docs-css', ['less:docs', 'autoprefixer:docs', 'cssmin:docs']);
    grunt.registerTask('docs-js', ['uglify:docs']);
    grunt.registerTask('default', ['docs-css', 'docs-js', 'docs-assets']);
};