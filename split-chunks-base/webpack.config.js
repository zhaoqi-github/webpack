const path = require('path');

/**
 * @type {import("webpack/types").Configuration}
 */
const config = {
  mode: 'production',
  entry: {
    main: './src',
    'a-initial': './src/a',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  /* optimization: {
    // Instruct webpack not to obfuscate the resulting code
    minimize: false,
    //splitChunks: false,
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        // We're disabling it by setting it to false.
        default: false,
        defaultVendors: {
          minSize: 0,
          minChunks: 3,
          test: /node_modules/,
        },
      },
    },
  }, */
  optimization: {
    // Instruct webpack not to obfuscate the resulting code
    minimize: false,
    splitChunks: {
      minSize: 0,
      chunks: 'initial',
      minChunks: 1,
      cacheGroups: {
        // Disabling this cache group.
        default: false,
      },
    },
  },  
  context: __dirname,
};

module.exports = config;
