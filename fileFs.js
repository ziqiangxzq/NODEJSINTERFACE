const fs = require('fs')
const path = require('path')
let file = path.resolve(__dirname, './file.txt')
let data = {
    a: 1
}
// 异步写入数据到文件
fs.writeFile(file, JSON.stringify(data, null, 4), { encoding: 'utf8' }, err => {})