const HtmlWebpackPlugin = require('html-webpack-plugin')

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks
  })
}

const htmlPages = [
  createPages('./src/index.html', './index.html', ['index']),
  createPages('./src/pages/hobbies.html', './hobbies.html', ['index']),
  createPages('./src/pages/tests.html', './tests.html', ['index']),
  createPages('./src/pages/tests/test_your_character.html', './test_your_character.html', ['index']),
  createPages('./src/pages/tests/test_result.html', './test_result.html', ['index']),
]

module.exports = htmlPages
