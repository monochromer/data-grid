const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const isProduction = NODE_ENV === 'production';

var config = {
  plugins: [
    require('autoprefixer')({
        browsers: ['last 4 versions', '> 1%', 'IE 9']
    })
  ]
};

if (isProduction) {
  config.plugins.push(require('cssnano')())
}

module.exports = config;