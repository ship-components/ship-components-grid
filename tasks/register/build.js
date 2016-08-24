/**
 * CMD: grunt
 *
 * ---------------------------------------------------------------
 *
 * Default grunt command builds the src
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('build', [
    'clean',
    'webpack:dev',
    'webpack:dist'
  ]);
};
