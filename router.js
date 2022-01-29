/*
    router.js
    职责
        处理路由
        根据不同的请求方法 + 请求路径设置不同的处理函数
*/
var fs = require('fs')
var Student = require('./students')

// Express 提供了一种更好地方式来包装路由
var express = require('express')

//  1.创建一个路由容器
var router = express.Router()

// 2.把路由挂载到容器中
router.get('/students' , function(req , res){
        // readFile 第二个参数是可选的 将文件内容转成指定编码的参数
        // 也可以使用 toString() 方法
        // fs.readFile('./db.json' ,'UTF-8', function(err , data){
        //     if(err){
        //         return res.status(500).send('Server error.')
        //     }
        //     // console.log(typeof data);
        //     var students = JSON.parse(data).students
        //     res.render('index.html',{
        //         fruits :[
        //             '苹果',
        //             '香蕉',
        //             '橘子',
        //             '草莓'
        //         ],
        //         students : students
        //     })
        // })
        // 使用封装好的方法
        Student.find(function(err , students){
            if(err){
                return res.status(500).send('Server error.')
            }
            res.render('index.html',{
                fruits :[
                    '苹果',
                    '香蕉',
                    '橘子',
                    '草莓'
                ],    
                students : students
            })
        })
        
    })

// 渲染添加页面
router.get('/students/new' , function(req , res){
    res.render('new.html')
})

// 处理添加学生请求
router.post('/students/new' , function(req , res){
    // 1. 获取表单数据 req.body
    // 2. 处理
    //  将数据保存到 db.json中
    // 3. 发送响应
    new Student(req.body).save(function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        // 重定向到首页
        res.redirect('/students')
    })
})

// 渲染编辑页面
router.get('/students/edit' , function(req , res){
    //  1. 在客户端的列表页中处理链接问题 需要 id 参数
    //  2. 获取要编辑的学生 id
    //  3. 渲染编辑页面
    //      根据 id 查询学生信息
    //      使用模板引擎渲染页面
    var id = req.query.id.replace(/"/g , '')
    Student.findById( id , function(err , student){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html' , {
            student : student
        })
    })
})

// 处理编辑请求
router.post('/students/edit' , function(req , res){
    // 1. 获取表单数据
    //       req.body
    // 2. 更新
    //      Student.updateById
    // 3. 发送响应
    var id = req.body.id.replace(/"/g , '')
    Student.findByIdAndUpdate( id , req.body , function( err ){
        if(err){
            return res.status(500).send('Server error.')
        }
        // 重定向到首页
        res.redirect('/students')
    })
})

// 处理删除请求
router.get('/students/delete' , function(req , res){
    //  1. 获取删除的id
    //  2. 根据 id 删除操作
    //  3. 发送响应数据
    var id = req.query.id.replace(/"/g , '')
    Student.findByIdAndRemove( id , function(err) {
        if(err){
            return res.status(500).send('Server error.')
        }
        // 重定向到首页
        res.redirect('/students')
    })
})

//  3.把 router 导出
module.exports = router




// 原生的方法
// module.exports = function(app){
//     // 渲染首页
//     app.get('/students' , function(req , res){
//         // readFile 第二个参数是可选的 将文件内容转成指定编码的参数
//         // 也可以使用 toString() 方法
//         fs.readFile('./db.json' ,'UTF-8', function(err , data){
//             if(err){
//                 return res.status(500).send('Server error.')
//             }
//             // console.log(typeof data);
//             var students = JSON.parse(data).students
//             res.render('index.html',{
//                 fruits :[
//                     '苹果',
//                     '香蕉',
//                     '橘子',
//                     '草莓'
//                 ],
//                 students : students
//             })
//         })
        
//     })

//     // 渲染添加页面
//     app.get('/students/new' , function(req , res){

//     })

//     // 处理添加学生请求
//     app.get('/students/new' , function(req , res){
        
//     })

//     // 渲染编辑页面
//     app.get('/students/new' , function(req , res){
        
//     })

//     // 处理编辑请求
//     app.get('/students/new' , function(req , res){
        
//     })

//     // 处理删除请求
//     app.get('/students/new' , function(req , res){
        
//     })
// }
