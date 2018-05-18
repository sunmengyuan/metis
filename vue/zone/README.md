# 简易个人空间 #

### Vue + Express + MongoDB + Fs ###

项目名称 __zone__

这是一个简易的个人空间，用户在该站注册后即可发布个人日记，教科书级别的增删改查功能。背景设计使用了 [Trianglify](https://github.com/qrohlf/trianglify)，在此推荐。

![](http://oru3b8jlz.bkt.clouddn.com/screenshot-zone.jpg)

*****

#### 参考资料 ####

+ [Vue.js](http://cn.vuejs.org/)

+ [Node.js 开发指南](http://okj45byt5.bkt.clouddn.com/Node.js%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.pdf)

+ [深入浅出 Node.js](http://okj45byt5.bkt.clouddn.com/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BANode.js.pdf)

+ [Node.js 中文网](http://nodejs.cn/)

+ [Express - 基于 Node.js 平台的 Web 应用开发框架](http://www.expressjs.com.cn/)

+ [深入学习 MongoDB](http://okj45byt5.bkt.clouddn.com/%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0MongoDB.pdf)

+ [MongoDB for GIANT Ideas | MongoDB](https://www.mongodb.com/)

+ [Mongoose 文档](http://www.nodeclass.com/api/mongoose.html)

+ [Webpack](https://webpack.github.io/docs/)

*****

#### 启动方法 ####
    
需要[安装 MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community)。不了解 MongoDB 的同学可移驾[官网](https://www.mongodb.com/)，英语欠佳的请点击[此处](http://www.runoob.com/mongodb/mongodb-tutorial.html)。

需要创建数据库（database）__zone__，数据表（collection）__users__、__articles__。具体方法请参见 [MongoDB 概念解析](http://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)。

启动 mongodb

```bash
cd mongodb
mkdir -p data/db
cd mongodb/bin
./mongod --dbpath ../data/db
```

启动 zone

```
cd zone
npm install
cd bin
./www

cd zone/fe
npm install
npm run dev
```

*****

作者：呆恋小喵

欢迎参观：<https://sunmengyuan.github.io/garden/>
