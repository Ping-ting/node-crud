# 一个使用express+mongodb 实现的学生信息增删改查的练习
+ 使用的是express框架和mongodb数据库
+ 初期是使用文件读取存储数据的，主要是`students-fs.js`文件和`db.json`文件，自己封装了一些函数来使用
+ 之后使用了数据库来读取存储数据，使用的都是`mongodb`的`API`
+ 其中`views`文件中的`html`页面来自`bootstrap`官网的模板
+ demo中只完成了对学生信息的增删改查功能，比较适合刚刚入门node的初学者用来练手