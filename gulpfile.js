const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');

gulp.task('default', function () {
	browserSync.init({
		server: './'
	});
	gulp.watch([ './**/*',], ['sass','pug', browserSync.reload]);
});

gulp.task('sass', () => {
	gulp.src('./sass/**/*')
		.pipe(sass())
		.on('error', (error) => {
			console.log(error);
		})
		.pipe(gulp.dest('./'));
});

gulp.task('pug', () => {
	gulp.src('./pug/**/*')
		.pipe(pug())
		.on('error', error => {
			console.log(error);
		})
		.pipe(gulp.dest('./'));
});

