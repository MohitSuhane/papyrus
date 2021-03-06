var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  del = require('del'),
  exec = require('child_process').exec;

var sassSrc = "src/web/styles/**/*.scss",
  sassDest = "src/web/styles",
  sassCssSrc = "src/web/styles/scss/app.scss",
  sassJsSrc = "src/web/styles/main.ts",
  appSrc = "src/**/*.ts",
  publicDir = "public";

var htmlSrc = '*.html',
  fontDirs = [
    'jspm_packages*/github/twbs/bootstrap*/fonts/*',
    'jspm_packages*/npm/font-awesome*/fonts/*'
  ];

var buildFiles = ['public/app*'];

gulp.task('clean', function () {
  return del(buildFiles);
});

gulp.task('clean:fonts', function () {
  return del(publicDir + '/' + fontDirs);
});

gulp.task('clean:html', function () {
  return del(publicDir + '/' + htmlSrc);
});

gulp.task('copy:fonts', function () {
  return gulp.src(fontDirs)
    .pipe(gulp.dest(publicDir));
});

gulp.task('copy:html', function () {
  return gulp.src(htmlSrc)
    .pipe(gulp.dest(publicDir));
});

gulp.task('compile:css', function () {
  return gulp.src(sassCssSrc)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(sassDest));
});

gulp.task('build:js', gulp.series('compile:css', function run_build_app() {
  return exec('npm run build-app');
}));

gulp.task('build:app', gulp.series('build:js'));

gulp.task('build', gulp.series('clean', 'copy:html', 'copy:fonts', 'build:app'));

gulp.task('watch', function () {
  gulp.watch([sassSrc, appSrc, sassJsSrc], gulp.series('build:app')).on('change', function (event) {
    console.log(event);
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });  
});

gulp.task('watch:build', gulp.series('build', 'watch'));

gulp.task('default', gulp.series('watch:build'));
