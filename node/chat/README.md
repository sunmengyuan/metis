# 多人聊天室 #

### Express + MongoDB + Websocket ###

项目名称 __chat__

Node.js 结合了 Websocket 的简易多人聊天室，感兴趣的同学可以自行高仿个 QQ 出来。

![](http://oru3b8jlz.bkt.clouddn.com/screenshot-chat.jpg)

*****

#### 参考资料 ####

+ [Node.js 开发指南](http://okj45byt5.bkt.clouddn.com/Node.js%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.pdf)

+ [深入浅出 Node.js](http://okj45byt5.bkt.clouddn.com/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BANode.js.pdf)

+ [Node.js 中文网](http://nodejs.cn/)

+ [Express - 基于 Node.js 平台的 Web 应用开发框架](http://www.expressjs.com.cn/)

+ [Socket.IO](http://socket.io/)

+ [深入学习 MongoDB](http://okj45byt5.bkt.clouddn.com/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0MongoDB.pdf)

+ [MongoDB for GIANT Ideas | MongoDB](https://www.mongodb.com/)

+ [Mongoose 文档](http://www.nodeclass.com/api/mongoose.html)

*****

#### 启动方法 ####

需要[安装 MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community)。不了解 MongoDB 的同学可移驾[官网](https://www.mongodb.com/)，英语欠佳的请点击[此处](http://www.runoob.com/mongodb/mongodb-tutorial.html)。

需要创建数据库（database）__chat__，数据表（collection）__users__。具体方法请参见 [MongoDB 概念解析](http://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)。

启动 mongodb

```bash
cd mongodb
mkdir -p data/db
cd mongodb/bin
./mongod --dbpath ../data/db
```

启动 chat

```
cd chat
npm install
cd bin
./www
```

*****

#### 核心代码 ####

+ __用户上线__

    服务端
    ```javascript
    socket.on('online', function (data) {
        User.find({id: data.id}, {}, {}, function (err, result) {
            if (!err) {
                io.sockets.emit('online', result[0]);
                _this.onlines.push(data.id);
            }
        });
    });
    ```

    客户端
    ```javascript
    socket.emit('online', {
        id: user.id,
        nickname: user.nickname
    });
    ```
    ```javascript
    socket.on('online', function (data) {
        _this.sendNews(data, '进入聊天室');

        var $user = $('#user_' + data.id);
        if ($user.length) {
            $user.removeClass('offline').addClass('online');
        } else {
            $user = $('#module_member').html()
                .replace('$id', data.id)
                .replace('$status', 'online')
                .replace('$nickname', data.nickname)
                .replace('$info', JSON.stringify(data));
        }
        _this.members.prepend($user);
    });
    ```
    
+ __用户下线__

    服务端
    ```javascript
    socket.on('disconnect', function () {
        if (cur_user) {
            _this.activers[cur_user.id] = false;

            var t = setTimeout(function () {
                var status = _this.activers[cur_user.id];
                if (!status) {
                    io.sockets.emit('offline', {
                        id: cur_user.id,
                        nickname: cur_user.nickname
                    });
                    method.rmArrElem(_this.onlines, cur_user.id);

                    delete _this.activers[cur_user.id];
                }
            }, 1000);
        }
    });
    ```

    客户端   
    ```javascript
    socket.on('offline', function (data) {
        _this.sendNews(data, '离开聊天室');

        var $user = $('#user_' + data.id);
        if ($user.length) {
            $user.removeClass('online').addClass('offline');
        }
        _this.members.append($user);
    });
    ```
    
+ __用户发送信息__

    服务端
    ```javascript
    socket.on('message', function (data) {
        io.sockets.emit('message', {
            user: {
                id: data.user.id,
                nickname: data.user.nickname
            },
            message: data.message
        });
    });
    ```

    客户端
    ```javascript
    var $btn = $('.js_send');
    var $input = $('.js_input');
    var method = function () {
        var value = $input.val();
        var cur_user = global.cur_user;

        if (value) {
            $('.js_active').removeClass('js_active');

            socket.emit('message', {
                user: {
                    id: cur_user.id,
                    nickname: cur_user.nickname
                },
                message: value
            });
            $input.val('');

            var $item = $('#module_message').html()
                .replace('$view', 'self')
                .replace('$nickname', '我')
                .replace('$message', value);
            _this.message.append($item);
            _this.scrolling();
        }
    };
    $btn.on('click', function () {
        method();
    });
    $input.on('keydown', function (e) {
        $('.js_dialog').length || (e.keyCode == '13') && method();
    });
    ```
    ```javascript
    socket.on('message', function (data) {
        $('.js_active').removeClass('failed').find('p').removeClass('js_resend');

        if (global.cur_user.id != data.user.id) {
            var $item = $('#module_message').html()
                .replace('$view', 'other')
                .replace('$nickname', data.user.nickname)
                .replace('$message', data.message);
            _this.message.append($item);
            _this.scrolling();
        }
    });
    ```
    
*****
    
作者：呆恋小喵

欢迎参观：<https://sunmengyuan.github.io/garden/>
