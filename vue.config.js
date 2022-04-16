const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        // 配置读取 *.md 文件的规则
        {
          test: /\.md$/,
          loader: "'vue-markdown-loader','text-loader'",
          options: {
            preprocess: function (MarkdownIt, Source) {
              MarkdownIt.renderer.rules.table_open = function () {
                return '<div class="table-container"><table class="table">';
              };
              MarkdownIt.renderer.rules.table_close = function () {
                return '</table></div>';
              };
              return Source;
            }
          }
        }

      ],
    },
  },

})

module.exports ={
  devServer:{
  //   disableHostCheck:true
    host:'localhost',
    historyApiFallback: true,
    allowedHosts:"all"
  }
}
