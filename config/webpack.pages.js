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
  createPages('./src/pages/articles/article.html', './article.html', ['index']),
  createPages('./src/pages/about.html', './about.html', ['index']),  
  createPages('./src/pages/search.html', './search.html', ['index', 'search', 'search_data']),
  createPages('./src/pages/articles.html', './articles.html', ['index', 'search_articles', 'search_articles_data']),
  createPages('./src/pages/articles-search.html', './articles-search.html', ['index', 'search_articles', 'search_articles_data']),

]

module.exports = htmlPages
