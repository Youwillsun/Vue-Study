//由于webpack是基于node进行构建的，所有wepack的配置文件中，任何合法的代码都是支持的
var path = require('path');
//在内存中，根据指定的模板页面，生成一份内存中的首页，同时把自动打包好的bundle注入到页面底部
//如果要配置插件，需要在导出的对象中，挂载一个plugin 节点
var htmlWebpackPlugin = require('html-webpack-plugin');

//当以命令行形式运行webpack或webpack-dev-server的时候，工具会发现，我们并没有提供要打包的文件入口和出口文件，
    //此时它会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根据这个配置对象，进行打包构建。
module.exports = {
    entry:path.join(__dirname,'./src/main.js'),//入口文件
    output:{//指定输出选项
        path:path.join(__dirname,'./dist'),//输出路径
        filename:'bundle.js'//指定输出文件名称
    },
    plugins:[//所有webpack插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),//指定模板文件路径
            filename:'index.html'//设置生成的内存页面名称
        })
    ],
    module:{//配置所有第三方loader模块
        rules:[//第三方模块匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},//处理css文件的loader
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//处理less文件的loader
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},//处理scss文件的loader
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=2541&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
            //limit给定的值是图片的大小，单位是byte，如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串
                //如果图片小于给定的limit值，则会被转为base64的字符串

            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件的loader
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置Babel来转换高级的ES语法
            {test:/\.vue$/,use:'vue-loader'},//处理.vue文件的loader
            
        ]
    },
    resolve:{
        alias:{//修改vue被导入时候的包的路径
            // "vue$":"_vue@2.6.8@vue/dist/vue.js"
        }
    }
}