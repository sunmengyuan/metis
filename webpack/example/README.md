1. 全局安装 webpack

    ``` bash
    npm install webpack -g
    ```

2. 创建项目

    ```bash
    mkdir example
    ```

3. 创建 package.json

    ```bash
    npm init
    ```

    ```json
    {
        "name": "webpack-example",
        "version": "1.0.0",
        "author": "sunmy <sunmy_meow@sina.com>",
        "description": "学习如何使用 webpack",
        "main": "entry.js",
        "scripts": {
            "dev": "webpack-dev-server",
            "build": "webpack -p"
        },
        "dependencies": {
            "webpack": "~1.13.3",
            "webpack-dev-server": "~1.16.2",
            "html-webpack-plugin": "~2.24.0",
            "style-loader": "~0.13.1",
            "css-loader": "~0.25.0",
            "less": "~2.7.1",
            "less-loader": "~2.2.3",
            "babel-core": "~6.18.0",
            "babel-preset-es2015": "~6.18.0",
            "babel-loader": "~6.2.7",
            "file-loader": "~0.9.0",
            "url-loader": "~0.5.7"
        }
    }
    ```

4. 创建 src (源文件)、dist (打包文件)

    ```bash
    cd example
    
    mkdir src
    
    mkdir dist
    ```

5. 创建 entry.js (入口文件)

6. 创建 .babelrc

    ```json
    {
        "presets": ["es2015"]
    }
    ```

7. 创建 webpack.config.js

    ```javascript
    var path = require('path');
    var htmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
        devtool: 'eval-source-map',              // 配置 source maps
        entry: './entry.js',                     // 入口文件
        output: {                                // 打包文件
            path: './dist',
            filename: 'bundle.min.js',
        },
        devServer: {                             // 构建本地服务器
            port: 8000,
            inline: true,                        // 实时刷新
            contentBase: './src'
        },
        module: {
            loaders: [                           // 文件处理
                {                                // 支持 less
                    test: /\.less$/,
                    loader: 'style!css!less'     
                },
                {                                // 支持 ES6 (需创建 .babelrc)
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.(jpg|png|svg)$/,
                    loader: 'url'
                }
            ]
        },
        plugins: [                               // 插件
            new htmlWebpackPlugin({              // 打包时自动生成 html 文件
                template: './src/index.html'
            })
        ]
    };
    ```

*****

```bash
# 安装依赖
npm install

# 打包
npm run build

# 启动本地服务器
npm run dev
```
