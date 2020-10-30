const path = require('path')//nodejs基本包。用来处理路径。绝对路径
const VueLoaderPlugin = require('vue-loader/lib/plugin')//vue-loader是 15之后的版本，需要这里①
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV == 'development';

const config={
// module.exports = {//有了环境的区分后就可以先判断，再输出
    target:'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:isDev ? '"development"' : '"production'//注意这里必须不能落下引号们
            }
        }),
        new VueLoaderPlugin(),//vue-loader是 15之后的版本，需要这里②
        new HTMLPlugin()
    ],
    module: {//帮助webpack去识别它不认识的语法
        rules: [
            {
                test: /\.vue$/,//检测文件类型
                loader: 'vue-loader'//webpack就有vue-loader来为webpack处理.vue文件类型
            },{
                test: /\.jsx$/,//检测文件类型
                loader: 'babel-loader'//webpack就有vue-loader来为webpack处理.vue文件类型
            },{//这里也得写上③
                test:/\.css$/,
                use: ['style-loader', 'css-loader']
            },{
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            limit:1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            },{//CSS预处理器
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },{
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }

        ]
    }
}


if(isDev){
    config.devtool = '#cheap-module-eval-source-map',//方便调试es6代码
    config.devServer = {//webpack2以后
        port: 8080,
        host: '0.0.0.0',//可以通过本机IP来访问，比如可以用手机去链接电脑调试
        overlay: {
            errors: true //这个可以把webpack打包后的错误输出到页面
        },
        // open: true//自动打开页面，就是每改一次就打开一个
        hot: true
    },
    config.plugins.push(//webpack关于热加载的配置
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;
