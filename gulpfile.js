let gulp = require('gulp'),
    gPrint = require('gulp-print'),
    unCSS = require('gulp-uncss'),
    imageMin = require('gulp-imagemin'),
    htmlMin = require('gulp-htmlmin');

gulp.task('removeCSS', () => {
    return gulp
        .src('dist/style.*.css')
        .pipe(gPrint())
        .pipe(unCSS({
            html: ['dist/index.html', 'dist/views/*.html'],
            ignore: ['.alert', '.alert h4', '.alert .alert-link', '.alert > p', '.alert > ul', '.alert > p + p', '.alert-dismissable', '.alert-dismissible', '.alert-dismissable .close', '.alert-dismissible .close', '.alert-success', '.alert-success hr', '.alert-success .alert-link', '.alert-info', '.alert-info hr', '.alert-info', '.alert-link', '.alert-warning', '.alert-warning hr', '.alert-warning .alert-link', '.alert-danger', '.alert-danger hr', '.alert-danger .alert-link', '.alert a:not(.close):not(.btn)', '.alert .close', '.close', '.close:hover', 'button.close', '.blnt-logo', '.navbar-collapse.in', '.collapse.in', '.btn[disabled]', '.btn.disabled']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('imageMinify', () => {
    return gulp
        .src('dist/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('htmlMinify', () => {
    return gulp
        .src('dist/views/*.html')
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'));
});

gulp.task('default', ['removeCSS', 'imageMinify', 'htmlMinify']);
