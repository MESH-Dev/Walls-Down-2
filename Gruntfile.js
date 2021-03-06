module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // concat - combine files to production version
        compass: {
          dist: {
            options: {
              sassDir : 'assets/sass/',
              cssDir: './',
              environment: 'development'
            }
          }
        },
        concat: {
          js: {
            // add/remove/edit files and order to project needs
            src: ['assets/js/jquery-1.11.1.min.js','assets/js/featherlight.min.js','assets/js/impress.js','assets/js/scripts.js'],
            dest: 'assets/prod/<%= pkg.name %>.js'
          }
        },
        // uglify - minify production js file created through concat
        uglify: {
          js: {
            files: {
              'assets/prod/<%= pkg.name %>.min.js': ['assets/prod/<%= pkg.name %>.js']
            }
          }
        },
        // Using the BrowserSync Server for your static .html files.
        
        // watch - tasks triggered with [grunt watch] is initiated in the cli
        watch:{
          cssconcat:{
            files: ['assets/css/*.css','!assets/css/*.min.css'],
            tasks: ['concat']
          },
          jsconcat:{
            files: ['assets/js/jquery-1.11.1.min.js','assets/js/featherlight.min.js','assets/js/impress.js','assets/js/scripts.js'],
            tasks: ['concat']
          },
          css: {
            files: ['assets/sass/**/*.scss'],
            tasks: ['compass']
          }
          
        },
        browserSync: {
          dev: {
            bsFiles: {
              src: [
                "*.css",
                "*.html"
              ]
            },
            options: {
              watchTask: true,
              proxy: "localhost/Walls-Down-2"
            }
          }
        }

    });
    // load tasks from node_modules
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // tasks that will be triggered with [grunt] in the cli
    grunt.registerTask('default', ['compass','browserSync', 'concat:js', 'uglify:js','watch']);
};
