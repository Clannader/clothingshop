module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    ['import', {
      libraryName: 'ant-design-vue'
    }, 'ant-design-vue']
  ]
}
