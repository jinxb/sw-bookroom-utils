const fs = require('fs');
const gulp = require('gulp')
const rename = require('gulp-rename')
const unzip = require('gulp-unzip')

const epubPath = 'H:\\paper\\bookDemo\\resource\\epub\\文学名著\\*.epub'
const zipPath = 'H:\\paper\\bookDemo\\resource\\epub\\文学名著\\'
const resPath = 'H:\\paper\\bookDemo\\resource\\epub2'
const imgPath = 'H:\\paper\\bookDemo\\resource\\img\\'
// 1、修改文件后缀名为zip
gulp.task('reName', function() {
  return gulp.src(epubPath)
  .pipe(rename({extname: '.zip'}))
  .pipe(gulp.dest(zipPath))
})

// 2、解压zip文件 (unzip解压并不能新建同样名称文件夹并放入解压后的资源文件)
gulp.task('bookUnzip', function(){
  fs.readdirSync(zipPath).forEach(file => {
    if (file.indexOf('zip') !== -1) {
      gulp.src(`${zipPath}${file}`)
      .pipe(unzip())
      .pipe(gulp.dest(`${resPath}${file.replace('.zip', '')}`))
    }
  })
})

// 3、将资源文件中的书籍封面图单独抽离
gulp.task('moveCover', function(){
  fs.readdirSync(resPath).forEach(file => {
    if (file.indexOf('201') !== -1) { return }
    fs.readdirSync(`${resPath}\\${file}`).forEach(file2 => {
      if (file2 === 'cover.jpg') {
        gulp.src(`${resPath}\\${file}\\${file2}`,)
        .pipe(gulp.dest(`${imgPath}${file.replace('.jpg', '')}`))
      }
    })
  })
})
gulp.task('default', gulp.series(['reName', 'bookUnzip', 'moveCover']))