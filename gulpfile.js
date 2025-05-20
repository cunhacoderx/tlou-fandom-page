const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

// Caminhos da estrutura
const paths = {
  html: {
    src: 'public/index.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/styles/main.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/main.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dist/images/'
  }
};

//Tarefas
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function watch() {
  gulp.watch('public/index.html', html);
  gulp.watch('src/styles/**/*.scss', styles);
  gulp.watch('src/js/main.js', scripts);
  gulp.watch('src/assets/images/*', images);
}

//Exports
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;

exports.default = gulp.series(
  gulp.parallel(html, styles, scripts, images)
);
