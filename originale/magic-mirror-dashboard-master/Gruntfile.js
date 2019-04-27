module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt);

    grunt.registerTask('default', ['express:dev','watch']);
    grunt.registerTask('offline', ['express:offline','watch']);
    grunt.registerTask('build', ['compass:dev', 'browserify:dev']);
};
