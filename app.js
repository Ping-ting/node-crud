/*
*   app.js 入门模块
*   职责：
    创建服务
    做一些服务相关的配置
        模板引擎
        body-parser 解析表单 post 请求体
        提供静态资源服务
    挂载路由
    监听端口启动

*
*/
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')


var fs = require('fs')
var app = express()

// 静态服务开放
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

// 在 express 中配置 art-template
app.engine('html' , require('express-art-template'))

// 配置body-parser (post请求体) 
// 放在挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//挂载路由 
app.use(router)

// 处理404
// app.use(function(req , res){
//     // 404 页面
// })

app.listen(3000 , function(){
    console.log('running 3000...')
})

module.exports = app