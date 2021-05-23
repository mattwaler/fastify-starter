module.exports = {
  files: ['./views/**/*', './public/**/*'],
  ignore: ['node_modules', '.git'],
  proxy: 'http://localhost:3000',
  notify: false,
  reloadDebounce: 500,
  reloadDelay: 500,
  snippetOptions: {
    rule: {
      fn: function (snippet, match) {
        return snippet + match
      },
      match: /<\/head>/i,
    },
  },
}
