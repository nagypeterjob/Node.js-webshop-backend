var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bs = require('browser-sync').create();

gulp.task('default', function() {
  nodemon({ script : './index.js', ext : 'js' });
});

gulp.task('browser-sync',function(){
  browserSync.init({
    server:{
      baseDir:"./"
    }
  });
});

