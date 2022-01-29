/*
    students.js 
    数据操作文件模块
    职责：操作文件中的数据 只处理数据 不关心业务 
    封装异步API 
*/
var fs = require('fs')

var dbPath = './db.json'

/*
    获取所有学生列表
    callback中的参数
        第一个参数是 err   成功是null 失败是错误对象
        第二个参数是 结果  成功是数组 失败是undefined
    return []
*/ 
exports.find = function (callback) {
    fs.readFile(dbPath ,'utf8', function(err , data){
        if(err){
            return callback(err)
        }
        callback(null , JSON.parse(data).students)
    })
}
/*
    根据 id 获取学生信息
    @param {number}      id       学生 id
    @param {function}  callback   回调函数
*/ 
exports.finById = function(id , callback){
    fs.readFile(dbPath ,'utf8', function(err , data){
        if(err){
            return callback(err)
        }
        var students =  JSON.parse(data).students
        var ret = students.find(function( item ){
            return item.id === parseInt(id)
        })
        callback(null , ret)
    })
}

/*
    添加保存学生
    student 为添加的学生信息对象
    callback为回调函数
*/
exports.save = function(student , callback){
    // 读出数据 添加信息
    fs.readFile(dbPath ,'utf8', function(err , data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        // 处理id问题
        student.id = students[students.length - 1].id + 1
        students.push(student)
        // 转成字符串 写入文件中
        var fileData = JSON.stringify({
            students:students
        })
        
        fs.writeFile(dbPath , fileData , function(err){
            //    写入文件路径  文件数据    回调函数
            if(err){
                // 错误的话直接将错误对象传给 callback函数 交给业务层处理
                return callback(err)
            }
            // 没有错误的话传 null 给 callback 函数
            callback(null)
        })
    })
}

/*
    更新学生

*/
exports.updateById = function(student , callback){
    fs.readFile(dbPath ,'utf8', function(err , data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        
        // find方法
        // 接收一个函数作为参数
        // 当符合条件 item.id === student.id 时 会终止遍历 返回遍历项
        // 将 id 统一转换为 number 类型
        student.id = parseInt(student.id)
        var stu = students.find(function (item) {
            return item.id === student.id
        })

        // 遍历拷贝对象
        for(var key in student){
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({
            students:students
        })
        
        fs.writeFile(dbPath , fileData , function(err){
            //    写入文件路径  文件数据    回调函数
            if(err){
                // 错误的话直接将错误对象传给 callback函数 交给业务层处理
                return callback(err)
            }
            // 没有错误的话传 null 给 callback 函数
            callback(null)
        })
    })
}

/*
    删除学生
*/
exports.deleteById = function(id , callback){
    fs.readFile(dbPath ,'utf8', function(err , data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        
        // findIndex 根据条件查找于元素下标
        var deleteId = students.findIndex(function(item){
            return item.id === parseInt(id)
        })

        // splice(a , b) 从下标 a 开始删 b 个元素
        students.splice(deleteId , 1)

        var fileData = JSON.stringify({
            students:students
        })
        
        fs.writeFile(dbPath , fileData , function(err){
            //    写入文件路径  文件数据    回调函数
            if(err){
                // 错误的话直接将错误对象传给 callback函数 交给业务层处理
                return callback(err)
            }
            // 没有错误的话传 null 给 callback 函数
            callback(null)
        })
    })
}