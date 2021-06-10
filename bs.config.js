module.exports = {
  files: ['./views/**/*', './public/**/*'],
  ignore: ['node_modules', '.git'],
  proxy: 'http://localhost:3000',
  notify: false,
  reloadDebounce: 500,
  reloadDelay: 500,
  open: false,
}
