const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const svgmin = require('gulp-svgmin');
const replace = require('gulp-replace');


gulp.task('default', () => {
  return gulp
    .src('./src/assets/img/svg/*.svg')
    .pipe(svgmin())
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[opacity]').removeAttr('opacity');
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace('&gt', '>'))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(gulp.dest('./src/assets/img/'));
});
