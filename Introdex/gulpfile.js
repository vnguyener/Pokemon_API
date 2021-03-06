var gulp = require("gulp");
var del = require("del");
var tsc = require("gulp-typescript");
var tsProject = tsc.createProject("tsconfig.json");
var tslint = require("gulp-tslint");
var sass = require("gulp-sass");

// cleaning
gulp.task("clean", function() {
   return del(["build"]) ;
});

// compiling typescript
gulp.task("compile", function() {
   var tsResult = gulp.src("src/**/*.ts")
        .pipe(tsc(tsProject));
   return tsResult.js
        .pipe(gulp.dest("build"));
});

// ts files
gulp.task("resources", function() {
   return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});

// compiling sass
gulp.task("sass", function() {
    return gulp.src("assets/sass/*")
    .pipe(sass())
    .pipe(gulp.dest("assets/css"));
})

// assets 
gulp.task("assets", function() {
    return gulp.src(["assets/**/*"])
        .pipe(gulp.dest("build/assets"))
})

// node modules
gulp.task("libs", function() {
    return gulp.src([
            "es6-shim/es6-shim.min.js",
            "systemjs/dist/system-polyfills.js",
            "angular2/bundles/angular2-polyfills.js",
            "angular2/es6/dev/src/testing/shims_for_IE.js",
            "systemjs/dist/system.src.js",
            "rxjs/bundles/Rx.js",
            "angular2/bundles/angular2.dev.js",
            "angular2/bundles/router.dev.js",
            "angular2/bundles/http.dev.js"
        ], {cwd: "node_modules/**"})
        .pipe(gulp.dest("build/lib"));
});

gulp.task("build", ["compile", "resources", "libs" , "sass", "assets"], function() {
    console.log("Typescript.. Jypescript.. Japescript.. Javscript.. Javascript ...");
});