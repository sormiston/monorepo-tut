/* eslint-env node */

import { src, dest, series } from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';

const mdCopyTask = async () => {
  return src('./src/**/*.md').pipe(dest('./dist'));
};

const lessTask = async () => {
  return src('./src/**/*.less')
    .pipe(less())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['> 1%', 'last 2 versions'],
        cascade: false,
      })
    )
    .pipe(dest('./dist'));
};

export default series(mdCopyTask, lessTask);
