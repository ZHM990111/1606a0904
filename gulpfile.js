var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
//编译scss，压缩css
gulp.task('css', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});
//监听css
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('css'))
});
//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('')
                    return
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
//整合命令
gulp.task('dev', gulp.series('css', 'server', 'watch'))