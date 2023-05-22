const { ConcatSource } = require('webpack-sources')

class FooterPlugin {
  constructor(options) {
    this.options = options;
    console.log('option', options);
  }

  apply(compiler) {
    console.log('complier', typeof compiler);
    compiler.hooks.compilation.tap('FooterPlugin', compilation => {
      compilation.hooks.processAssets.tap('FooterPlugin', () => {
        const chunks = compilation.chunks;
        console.log('chunks', chunks);
        for (const chunk of chunks) {
          for (const file of chunk.files) {
            console.log('file', file);
            const comment = `/* ${this.options.banner} */`;
            compilation.updateAsset(file, old => new ConcatSource(old, '\n', comment))
          }
        }
      })
    })
  }
}

module.exports = FooterPlugin