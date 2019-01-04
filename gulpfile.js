const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const spritesmith = require("gulp.spritesmith");

// *****************************************************************************
gulp.task("browser-sync", function() {
  browserSync.init({
    port: 9000,
    server: {
      baseDir: "./build/"
    }
  });

  gulp.watch("./build/", function(done) {
    browserSync.reload();
    done();
  });
});

// *****************************************************************************
gulp.task("compile:pug", function buildHTML() {
  return gulp
    .src("./source/templates/index.pug")
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("./build/"));
});

// *****************************************************************************
gulp.task("compile:sass", function buildCSS() {
  return gulp
    .src("./source/styles/main.scss")
    .pipe(
      sass({
        outputStyle: "uncompressed"
      }).on("error", sass.logError)
    )
    .pipe(
      rename(function(path) {
        path.basename += ".min";
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./build/css/"))
    .pipe(browserSync.stream());
});

// *****************************************************************************
gulp.task("compile:sprites", function(done) {
  const spriteData = gulp.src("./source/images/icons/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      imgPath: "../images/sprite.png",
      cssName: "sprite.scss"
    })
  );

  spriteData.img.pipe(gulp.dest("./build/images"));
  spriteData.css.pipe(gulp.dest("./source/styles/global/"));

  done();
});

// *****************************************************************************
gulp.task("clean:build", function() {
  return del("./build/**/*");
});

// *****************************************************************************
gulp.task("copy:fonts", function() {
  return gulp.src("./source/fonts/**/*.*").pipe(gulp.dest("./build/fonts"));
});

// *****************************************************************************
gulp.task(
  "copy:images",
  gulp.parallel(
    function() {
      return gulp
        .src("./source/images/!(icons)/**")
        .pipe(gulp.dest("./build/images/"));
    },
    function() {
      return gulp.src("./source/images/*.*").pipe(gulp.dest("./build/images"));
    }
  )
);

// *****************************************************************************
gulp.task("copy", gulp.parallel("copy:fonts", "copy:images"));

// *****************************************************************************
gulp.task("watch", function() {
  gulp.watch("source/template/**/*.pug", gulp.series("compile:pug"));
  gulp.watch("source/styles/**/*.scss", gulp.series("compile:sass"));
});

// *****************************************************************************
gulp.task(
  "default",
  gulp.series(
    "clean:build",
    "compile:sprites",
    gulp.parallel("compile:pug", "compile:sass", "copy"),
    gulp.parallel("watch", "browser-sync")
  )
);

// *****************************************************************************
