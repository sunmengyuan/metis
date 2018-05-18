1. 全局安装 karma、karma-cli
    
    ```bash
    npm install karma -g
    
    npm install karma-cli -g
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
        "name": "karma-example",
        "version": "1.0.0",
        "author": "sunmy <sunmy_meow@sina.com>",
        "description": "学习如何使用 karma",
        "scripts": {
            "test": "karma start ./karma/karma.conf.js",
            "coverage": "cd ./coverage/*/. && open -a '/Applications/Google Chrome.app' 'index.html'"
        },
        "dependencies": {
            "karma": "~1.3.0",
            "karma-cli": "~1.0.1",
            "karma-jasmine": "~1.0.2",
            "karma-coverage": "~1.1.1",
            "karma-chrome-launcher": "~2.0.0",
            "jasmine-core": "~2.5.2"
        }
    }
    ```

4. 创建 src (源文件)、test (测试文件)

5. 创建 karma.conf.js

    ```bash
    mkdir karma
    
    cd karma
    
    karma init
    ```
    
    ```javascript
    var karmaJasmine = require('karma-jasmine');
    var karmaCoverage = require('karma-coverage');
    var karmaChromeLauncher = require('karma-chrome-launcher');
    var jasmineCore = require('jasmine-core');
    
    module.exports = function (config) {
        config.set({    
            basePath: '',                                      // 相对目录   
            frameworks: ['jasmine'],                           // 断言库
            files: [                                           // 源文件、测试文件
                '../src/*.js',
                '../test/*.js'
            ],
            exclude: [],                                       // 忽略文件
            preprocessors: {'../src/*.js': 'coverage'},
            reporters: ['progress', 'coverage'],
            port: 9876,                                        // 端口号
            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: true,                                   // 自动监控
            browsers: ['Chrome'],                              // 测试浏览器
            singleRun: false,
            concurrency: Infinity,
            coverageReporter: {                                // 覆盖率报告
                type: 'html',
                dir: '../coverage/'
            },
            plugins: [                                         // 插件
                karmaJasmine,
                karmaCoverage,
                karmaChromeLauncher,
                jasmineCore
            ]
        })
    }
    ```

*****

```bash
# 安装依赖
npm install

# 启动自动化测试
npm run test

# 查看覆盖率报告
npm run coverage
```
