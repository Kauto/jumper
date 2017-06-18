// Minimize html
let fs = require('fs'),
    path = require('path'),
    minify = require('html-minifier').minify,
    _template = require('lodash/template');

function minimizeHtml () {
let data = _template(fs.readFileSync(__dirname + '/src/index.html', 'utf8'))({
        production: global.process.env.NODE_ENV === 'production',
        base64: function (file) {
            // read binary data
            let bitmap = fs.readFileSync(path.resolve(__dirname + '/' + directory, file));
            // convert binary data to base64 encoded string
            return 'data:image/gif;base64,' + (new Buffer(bitmap).toString('base64'));
        }
    }),
    result = minify(data, {
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        collapseWhitespace: true,
        removeComments: true
    });
fs.writeFile(__dirname + '/index.html', result, () => {
});
}

let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

if (global.process.env.NODE_ENV === 'production') {
    mix.js('src/app.js', 'dist/app.min.js').then(minimizeHtml);
} else {
    mix.js('src/app.js', 'dist/').then(minimizeHtml);
}

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.less(src, output);
// mix.stylus(src, output);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
