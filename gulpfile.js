//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'), //编译less
    cleanCSS = require('gulp-clean-css'), //压缩css
    rev = require('gulp-rev'), //给文件加上版本号
    revCollector = require('gulp-rev-collector'), //替换内容 
    clean = require('gulp-clean'),  //清空文件夹
    runSequence = require('run-sequence');  //gulp 任务执行顺序
 
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('css/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('css')); //将会在css下生成index.css
});

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

/*清空文件夹*/
gulp.task('clean',function(){
	return gulp.src(['dist','json'],{read: false})
		.pipe(clean());
});

/*add dev*/
gulp.task('ver',function(){
	return gulp.src(['css/*.css'])
		.pipe(rev())
		.pipe(gulp.dest('dist/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('json'));
});
	
gulp.task('dev',function(){
	return gulp.src(['json/rev-manifest.json','/index.html'])
		.pipe(revCollector({
			 replaceReved: true
		}))
		.pipe(gulp.dest('dist/html'));
});

gulp.task('default',function(){
	runSequence(
		'clean',
		'ver',
		'dev'
	);
});


/*gulp.task('default',['minify-css','ver'],function(){
	gulp.run('dev');
}); */
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径   