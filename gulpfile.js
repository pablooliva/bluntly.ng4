let gulp = require("gulp"),
    imageMin = require("gulp-imagemin"),
    htmlMin = require("gulp-htmlmin");

gulp.task("imageMinify", () => {
    return gulp
        .src("dist/assets/*")
        .pipe(imageMin())
        .pipe(gulp.dest("dist/assets"));
});

gulp.task("htmlMinify", () => {
    return gulp
        .src("dist/*.html")
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["imageMinify", "htmlMinify"]);
