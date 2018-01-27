var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var spawn = require('child_process').spawn;  
var runSeq = require('run-sequence');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var node;

const env = process.env.NODE_ENV;

gulp.task('build-i18n-fr', () => {
    return gulp.src('./client/i18n/fr.jsx')
        .pipe(rename('index.jsx'))
        .pipe(gulp.dest('./client/i18n/', { overwrite: true }));
});

gulp.task('build-i18n-en', () => {
    return gulp.src('./client/i18n/en.jsx')
        .pipe(rename('index.jsx'))
        .pipe(gulp.dest('./client/i18n/', { overwrite: true }));
});

gulp.task('build-js-fr', () => {
    return browserify({ entries: './client/src/view.jsx', extensions: ['.jsx'], debug: false })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('bundle_fr.js'))
        //.pipe(buffer())
        ///.pipe(uglify())
        .pipe(gulp.dest('client/.dist'));
});

gulp.task('build-js-en', () => {
    return browserify({ entries: './client/src/view.jsx', extensions: ['.jsx'], debug: false })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('bundle_en.js'))
        //.pipe(buffer())
        ///.pipe(uglify())
        .pipe(gulp.dest('client/.dist'));
});

gulp.task('build-css', () => {
    return gulp.src('./client/src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('client/.dist'));
});


gulp.task('startServer', () => {
    if (node) node.kill();
    //node = spawn('node', ['--inspect', '.'], {stdio: 'inherit'});
    node = spawn('node', ['.'], { stdio: 'inherit' });
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('watch', ['build'], () => {
    gulp.watch(['server/**/*'], ['startServer']);
});

gulp.task('default', ['watch', 'startServer']);
gulp.task('build', function(){
    return runSeq('build-css');
});