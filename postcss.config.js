const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    // "postcss-flexbugs-fixes",
    postcssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 0,
      features: {
        'custom-properties': true,
        'nesting-rules': true
      }
      // "importFrom": ["src/styles/properties.css", "src/styles/custom-media.css"]
    })
  ]
}
