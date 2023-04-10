//路由文件
var mysql = require('mysql');

function dealSql(sql) {
    return new Promise(resolve => {
        var connection = mysql.createConnection({
            host: '123.60.136.204',
            user: '123.60.136.204',
            password: 'Lbdw4CwBj6DBbCy5',
            port: 3306,
            database: '123.60.136.204'
        });
        connection.connect();
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);

            console.log('10089', JSON.stringify(results))
            resolve(JSON.stringify(results))

        });
    })
}
async function route(pathname, method, propData) {

    return new Promise(async resolve => {
        // switch (pathname) {
                // case '/cardlist':
                if(pathname=='/cardlist'){
                if (method == 'POST'){
                        //查询
                        let sql = '';
                        let page = propData.page;
                        let pagesize = propData.pagesize;
                        let sqlpage = Math.ceil(JSON.parse(await dealSql('SELECT * FROM `cardlist` WHERE user='+propData.user)).length / pagesize);
                        let subnum = JSON.parse(await dealSql('SELECT * FROM `cardlist` WHERE user='+propData.user)).length;

                        sql = 'SELECT * FROM `cardlist` WHERE user='+propData.user +' order by id desc limit ' + (page - 1) * pagesize + ',' + page * pagesize;
                        var result = await dealSql(sql)
                        console.log('1112',result)
                        result = { page: page, pagesize: pagesize, sqlsub: sqlpage, subnum: subnum, data: JSON.parse(result) }
                        resolve(JSON.stringify(result))
                    


                } else if (method == 'PUT') {//新增
                    console.log('iddddddddddd',propData.id)
                    if(!propData.id){
                    let sql = "INSERT INTO cardlist(endTime,startTime,date,user) VALUES (" + propData.endTime + "," + propData.startTime + "," + propData.date + "," + propData.user + ")";
                    var result = await dealSql(sql)
                    result = { isSuccess: true, id: JSON.parse(result).insertId }
                    resolve(JSON.stringify(result))
                    }else{
                    let sql = 'UPDATE cardlist SET endTime=' + propData.endTime+  ' WHERE id=' + propData.id;
                    let result = await dealSql(sql);
                    console.log('log', JSON.parse(result).affectedRows)
                    if (JSON.parse(result).affectedRows == 0) {
                        result = { isSuccess: false, message: '修改失败,请确认id是否正确!' }
                        resolve(JSON.stringify(result))
                    } else {
                        result = { isSuccess: true, message: '修改成功！' }
                        resolve(JSON.stringify(result))
                    }
                    }


            
                }else if(method=='OPTIONS'){
                    resolve(JSON.stringify({}))
                } 
                }else if(pathname=='/messagelist'){
console.log('19999999999999999997',pathname)
                
                // case '/messagelist':
                if (method == 'POST'){
                        //查询
                        let sql = '';
                        let page = propData.page;
                        let pagesize = propData.pagesize;
                        let sqlpage = Math.ceil(JSON.parse(await dealSql('SELECT * FROM `msglist` WHERE user='+propData.user)).length / pagesize);
                        let subnum = JSON.parse(await dealSql('SELECT * FROM `msglist` WHERE user='+propData.user)).length;

                        sql = 'SELECT * FROM `msglist`WHERE user='+ propData.user +' order by id desc limit ' + (page - 1) * pagesize + ',' + page * pagesize;
                        var result = await dealSql(sql)
                        console.log('1112',result)
                        result = { page: page, pagesize: pagesize, sqlsub: sqlpage, subnum: subnum, data: JSON.parse(result) }
                        resolve(JSON.stringify(result))
                    


                } else if (method == 'PUT') {//新增
                    
                    let sql = "INSERT INTO msglist(msg,time,user) VALUES (" + propData.msg + "," + propData.time + "," + propData.user+")";
                    var result = await dealSql(sql)
                    result = { isSuccess: true, id: JSON.parse(result).insertId }
                    resolve(JSON.stringify(result))

                }else if(method=='OPTIONS'){
                    resolve(JSON.stringify({}))
                } 
                // break;
            }
        // }

    })


}
//   route()
exports.route = route;