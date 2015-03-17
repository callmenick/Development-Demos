module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          cacheLocation: 'assets/sass/.sass-cache'
        },
        files: {
          'assets/css/fontawesome.css': 'assets/sass/fontawesome/fontawesome.scss',
          'assets/css/common.css': 'assets/sass/common/common.scss',
          'assets/css/main.css': 'assets/sass/main/main.scss'
        },
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 5 versions', 'ie 9']
      },
      target: {
        src: 'assets/css/*.css'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'assets/css',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      css: {
        files: 'assets/sass/**/*.scss',
        tasks: ['sass', 'autoprefixer', 'cssmin']
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks.
  grunt.registerTask('default', ['watch']);

};