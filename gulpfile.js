const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// Compile Sass
function css_main() {
	return gulp
		.src('assets.src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', includePaths: ['./assets.src/scss'] }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('assets/css'));
}

// Concat & minify JS
function js_main() {
	return gulp
		.src(['assets.src/js/utilities.js', 'assets.src/js/main/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(babel({ presets: ['@babel/env'] }).on('error', function (e) { console.log(e) }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('assets/js'));
}

// Watch files
function watchFiles() {
	gulp.watch('assets.src/scss/**/*.scss', gulp.series('css_main'));
	gulp.watch('assets.src/js/main/**/*.js', gulp.series('js_main'));
	gulp.watch('assets.src/js/utilities.js', gulp.series('js_main'));
}


// Export
exports.css_main = css_main;
exports.js_main = js_main;
exports.watch = watchFiles;
exports.default = gulp.series(css_main, js_main);
