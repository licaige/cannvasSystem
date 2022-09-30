//webpack是基于弄得进行构建的，支持node代码
//导入路径模块
var path = require('path')  

//启用热更新的第1步
const webpack = require('webpack')

//更具指定模板页面，在内存中生成一份html,同时把打包好的bundle.js自动注入该html
//配置插件，需要在plugins节点中,
var htmlWebpackPlugin = require('html-webpack-plugin')

//导出一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'),   //入口文件
    output: {   //指定输出选项
        path: path.join(__dirname, './dist'),   //输出路径
        filename: 'bundle.js'   //指定输出文件的名称
    },
    //启用热更新第2步，使用 webpack-dev-server这个工具来实现自动打包编译的功能
    // 想要正常运行，需要本地安装webpack
    devServer: {
        open: true,             //自动打开浏览器
        port: 6003,             //运行端口
        // contentBase: 'src',     //指定托管的根目录
        hot: true,              //启动热更新，第一步
    },
    plugins: [  //所有webpak 插件的配置节点
        new webpack.HotModuleReplacementPlugin(),   //new一个热更新的模块对象，把bundle.js自动引入html,启用热更新的第3步
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板文件路径
            filename: 'index.html'  //设置生成的内存页面名称
        })
    ],
    module: {   //配置所有第三方loader模块的
        rules: [    //第三方模块的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },                    //处理css文件
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},     //处理less文件
            // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},  //处理scss文件
            { test: /\.styl(us)?$/,use: ['style-loader', 'css-loader','stylus-loader']},      //处理stylus文件
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=17066&name=[hash:8]-[name].[ext]'}, //处理url地址,limit传参：比这个文件小的图片就不转成base64位图片,[hash:8]-[name].[ext]：8位哈希值-图片名.图片后缀。
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},  //处理字体文件的loader
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}, //解析ES6语法，必须把node_modules目录排除掉，
            { test: /\.vue$/, use: 'vue-loader' },  //解析vue文件
        ]
    },
    resolve: {
        alias: {    //修改vue被导入时候的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}

/* 
输入“webpack”命令开始打包

项目初始化json文件 :        
    npm init -y
自动打包并运行(修改自动更新，可以在内存自动生成bundle.js)  :             
    npm i webpack-dev-server@2.9.3 -D
本地安装webpack :
    npm i webpack@3.8.1 -D
安装"html-webpack-plugin": "^2.30.1" (在内存自动生成html文件)：
    npm i html-webpack-plugin@2.30.1 -D
修改package.json选项的配置文件;script, 命令行运行：npm run dev
    "dev": "webpack-dev-server --open --port 8080 --contentBase src --hot"
安装解析css文件的依赖包
    npm i style-loader@0.19.0 css-loader@0.28.7 -D
安装解析less文件的依赖包
    npm i less-loader@4.0.5 -D
    npm i less@2.7.3 -D
安装解析sass文件的依赖包
    npm i sass-loader@6.0.6 -D
    npm i node-sass@4.0.0 -D    //这个插件安装不了
安装解析stylus文件的依赖包
    npm install stylus-loader stylus --save-dev

安装处理url地址的依赖包
    npm i url-loader@0.6.2 -D
    npm i file-loader@1.1.5 -D
安装字体图标，安装bootstrap
    npm i bootstrap@3.3.7 -S
安装babel,用于转化ES6语法
    //babel转换工具： npm i babel-core babel-loader babel-plugin-transform-runtime -D
    //babel语法：    npm i babel-preset-env babel-preset-stage-0 -D
    //创建: .babelrc, 配置如下
        {
            "presets": ["env", "stage-0"],
            "plugins": ["transform-runtime"]
        }
安装vue的依赖包
    npm i vue-loader@13.0.5 -D
    npm i vue-template-compiler@2.5.16 -D //版本要和vue相同才行
安装路由模块
    npm i vue-router -S
按需引入Mint-ui ,需要安装下面
    npm install babel-plugin-component -D
    然后，将 .babelrc 修改为：
        {
            "presets": ["env", "stage-0"],
            "plugins": [
                "transform-runtime",
                ["component", [
                    {
                    "libraryName": "mint-ui",
                    "style": true
                    }
                ]]
            ]
        }
安装vue-resource
    npm i vue-resource -S

安装： babel-plugin-transform-remove-strict-mode 移除webpack的严格模式，这样才可以使用 mui
    npm install babel-plugin-transform-remove-strict-mode -D
    在文件夹根目录下找到 .babelrc 文件，修改：
        {
            "plugins": ["transform-remove-strict-mode"]
        }

安装VUE的图片预览插件： npm i vue-preview -S

安装VUEX:   npm i vuex -S

安装fastclick: npm i fastclick -S

安装：图片懒加载插件vue-lazyload
    npm install vue-lazyload -D

安装移动端调试工具  vConsole:
    npm install vconsole -D

安装js创建css3动画的插件： create-keyframe-animation
    npm install create-keyframe-animation






使用json-server模拟REST API
    首先你的电脑中需要安装nodejs，建议使用最新版本。然后全局安装json server.
    全局安装：           npm install json-server -g 
    运行(端口号)：      json-server data.json -p 5003 -H 192.168.169.149    //公司
    运行(端口号)：      json-server data.json -p 5003 -H 192.168.0.12       //宿舍
    运行(端口号)：      json-server data.json -p 5003 -H 192.168.0.100       //郴州
*/

/*
git相关
    初始化git:               git init
    查看git状态:             git status
    全部文件放入暂存区：      git add .
    提交文件：               git commit -m '这里填写提交信息'
    连接码云：               git remote add origin https://gitee.com/kgm0515/chuangzhi_vue_project.git
    推送到远程仓库：          git push -u origin master

    $git clone <远程Arepository> #克隆你fork出来的分支
        # git clone elemMobile
    $git remote add <远程Brepository标签> git@github.com:XXXX/ceph.git #添加远程Brepository标签
        # git remote add origin git@github.com:XXXX/ceph.git
    $git pull <远程B厂库标签> master:master  #从远程Brepository的master分支拉取最新objects合并到本地master分支
        # git pull origin master
    $git checkout YYYY #切换到要修改的分支上
        # git checkout devolopbranch
    $git branch develop; git checkout develop #在当前分支的基础上创建一个开发分支，并切换到该分支上，你将在该分支上coding
    coding...... #在工作区coding
    $git add .#将修改保存到索引区
        # git add .
    $git commit -a #将修改提交到本地分区
        # git commit -m '这里填写提交信息'
    $git push origin my_test:my_test #将本地分支my_test提交到远程A repository的my_test分支上
        # git push -u origin master
    

    
git pull origin master =========================
    要取回origin主机的next分支，与本地的master分支合并，需要写成下面这样 
        $ git pull origin next:master
    如果远程分支(next)要与当前分支合并，则冒号后面的部分可以省略。上面命令可以简写为
        $ git pull origin next
    上面命令表示，取回origin/next分支，再与当前分支合并。实质上，这等同于先做git fetch，再执行git merge
        $ git fetch origin
        $ git merge origin/next
    在某些场合，Git会自动在本地分支与远程分支之间，建立一种追踪关系(tracking)。比如，在git clone的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说，本地的master分支自动”追踪”origin/master分支。
    Git也允许手动建立追踪关系。
        $ git branch --set-upstream master origin/next
    


*/