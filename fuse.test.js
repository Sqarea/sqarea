const { FuseBox } = require('fuse-box')

const fuse = FuseBox.init({
  homeDir: '.',
  target: 'server@es6',
  output: '.test/$name.js',
  automaticAlias: false,
  alias: {
    src: '~/src'
  }
})

fuse.bundle('app').test('[**/**.test.ts]')
