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
    console.log('456',method)

    return new Promise(async resolve => {
        switch (pathname) {
            case '/cardlist':
                if (method == 'POST') {//查询或修改
                    if (propData.id) {
                        //修改
                        let sql = 'UPDATE person SET name="' + propData.name + '",age=' + propData.age + ',sex="' + propData.sex + '" WHERE id=' + propData.id;
                        let result = await dealSql(sql);
                        console.log('log', JSON.parse(result).affectedRows)
                        if (JSON.parse(result).affectedRows == 0) {
                            result = { isSuccess: false, message: '修改失败,请确认id是否正确!' }
                            resolve(JSON.stringify(result))
                        } else {
                            result = { isSuccess: true, message: '修改成功！' }
                            resolve(JSON.stringify(result))
                        }
                    } else {
                        //查询
                        let sql = '';
                        let page = propData.page;
                        let pagesize = propData.pagesize;
                        let sqlpage = Math.ceil(JSON.parse(await dealSql('SELECT * FROM `user`')).length / pagesize);
                        let subnum = JSON.parse(await dealSql('SELECT * FROM `user`')).length;

                        sql = 'SELECT * FROM `user` limit ' + (page - 1) * pagesize + ',' + page * pagesize;
                        var result = await dealSql(sql)
                        result = { page: page, pagesize: pagesize, sqlsub: sqlpage, subnum: subnum, data: JSON.parse(result) }
                        resolve(JSON.stringify(result))
                    }


                } else if (method == 'PUT') {//新增
                    let sql = "INSERT INTO person(name,age,sex) VALUES ('" + propData.name + "'," + propData.age + ",'" + propData.sex + "')";
                    var result = await dealSql(sql)
                    result = { isSuccess: true, id: JSON.parse(result).insertId }
                    resolve(JSON.stringify(result))
                } else if (method == 'DELETE') {//删除
                    console.log('456')
                    let sql = 'delete from `user` where id=' + propData.id;
                    var result = await dealSql(sql);
                    if (JSON.parse(result).affectedRows == 0) {
                        result = { isSuccess: false, message: '删除失败,请确认id是否正确!' }
                        resolve(JSON.stringify(result))
                    } else {
                        result = { isSuccess: true, message: '删除成功！' }
                        resolve(JSON.stringify(result))
                    }
                    console.log('7777', result)
                    // result={isSuccess:true,id:JSON.parse(result).insertId}
                    // resolve(JSON.stringify(result))
                }else if(method == 'OPTIONS'){
                    resolve(JSON.stringify({}))
                }

                break;
        }

    })


}
//   route()
exports.route = route;