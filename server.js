//接口
var http = require("http");
var url = require("url"); 
var fs = require("fs");
var formidable = require('formidable');
var multiparty = require('multiparty');
const path = require('path')
var result={
  data:{}
};
 function start(route) {
  async function onRequest(request, response) {
    console.log('11')
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader('Access-Control-Allow-Methods','*');
    
    
    const pathname = url.parse(request.url).pathname;//接口名称
    console.log('6666666',request);
    const method=request.method;//接口请求方法
    const propData={};//接口请求参数
    //下载接口
    if(pathname=='/download'){
      let reader=fs.createReadStream('./034A9189副本2.jpg')
      response.writeHead(200, {'Content-Type': 'application/force-download',
      'Content-Disposition': 'attachment; filename="034A9189.jpg"'});
      reader.pipe(response);
      return
    }
      //上传接口star
    if(pathname=='/upload'){
      // let reader=fs.createReadStream('./034A9189副本2.jpg')
      // response.writeHead(200, {'Content-Type': 'application/force-download',
      // 'Content-Disposition': 'attachment; filename="034A9189.jpg"'});
      // reader.pipe(response);
      // const form = new formidable.IncomingForm();
      // form.parse(request,(err,fields,files)=>{
      //   //req:请求对象，err错误对象，filelds：普通请求参数的内容
      //   //files：文件的内容
      //   console.log('requestis',files)
      //   let file = path.resolve(__dirname, './file.txt')
      //   fs.writeFile(file, JSON.stringify(files.testfile1, null, 4), { encoding: 'utf8' }, err => {})
      // })
      const form = new multiparty.Form();
    try {
        form.on('part', async function (part) {
            if (part.filename) {
              console.log('cccccccunzai')
                // 获取上传路径
                // 根据路径创建写入流
                var name=new Date().getTime()
                const writeStrem = fs.createWriteStream('./'+name+'.png')
                part.pipe(writeStrem)
                console.log('okkkkkkkkkkkkkkkkkkk')
                response.writeHead(200, {"Content-Type": "application/json"});
                result={};
                result.data=JSON.parse(JSON.toString({AA:11}));//传入接口名称 请求方法 请求参数
                // response.setHeader("Access-Control-Allow-Origin","*");
                response.write(JSON.stringify(result));
                response.end();
            }
            part.on('error', function (err) {
                fileStrem.destroy();
            });
        });
        form.parse(request)
    } catch (e) {
        console.log(e)
        response.send('500')
    }
    // response.send('200')
    // response.writeHead(200, {"Content-Type": "application/json"});
    // response.write(JSON.stringify('重新输入'));
    // response.end();
      return
    }
   //上传接口end
    if(url.parse(request.url).search!=null){
      let search= url.parse(request.url).search.toString();
      search = search.substring(1,search.length);
      let searchArr=search.split('&');
      searchArr.forEach(ele => {
        const name= ele.split('=')[0];
        const value=decodeURIComponent(ele.split('=')[1])  ;
        propData[name]=value;
      });
    }
    console.log('ccccccccccccccccc',propData)
    // if(method=='GET'||method=='POST'){
    response.writeHead(200, {"Content-Type": "application/json"});
    result={};
    result.data=JSON.parse(await route(pathname,method,propData));//传入接口名称 请求方法 请求参数
    // response.setHeader("Access-Control-Allow-Origin","*");
    response.write(JSON.stringify(result));
    response.end();
    // }else{
    //   response.writeHead(200, {"Content-Type": "application/json"});
    //   result={
    //     code:'502',
    //     message:'请求方法错误'
    //   }
    //   response.write(JSON.stringify(result));
    //   response.end();
    // }
 
  }
 
  http.createServer(onRequest).listen(8082);
  console.log("Server has started11.");
}
exports.start=start;
