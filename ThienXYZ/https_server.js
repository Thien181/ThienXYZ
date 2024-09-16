var express = require('express');

var bodyParser = require('body-parser') ;
var path = require('path');
const fetch = require('node-fetch'); //npm install node-fetch@2
//var https = require('https');
var fs = require('fs');
var serveStatic = require('serve-static');
//const expressip = require('express-ip');
//const expressip = require('./node_modules/express-ip/index.js');
const hostname = 'thien.xyz';


const options = {
    key: fs.readFileSync("ssl/server.key"),
    cert: fs.readFileSync("ssl/certificate.crt"),
	ca:fs.readFileSync("ssl/CABundle.crt")
}
var port = 3000; //443;//80;
var app = express();

var url = require('url');//NOT SURE What is this for
//app.use(expressip().getIpInfoMiddleware);
var counting = 0;
//var SCORMPAK_DIR = 'C:\SCORMPAK';
//app.set('views','C:\\_ThienXYZ\\XYZ');
app.set('views',path.join(__dirname,'XYZ'));

app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//set static folder 
//app.use(serveStatic(path.join(__dirname, 'public-optimized')))

//app.use(express.static('C:\\SCORMPAK\\_PE-Front'));
//app.use(serveStatic('C:\\_ThienXYZ\\XYZ'));
//app.use(serveStatic('C:\\_ThienXYZ\\XYZ\\MainHTML'));
app.use(serveStatic(path.join(__dirname, 'XYZ')));
app.use(serveStatic(path.join(__dirname, 'XYZ/MainHTML')))

//Body parser middleware


var urlencodesimpledParser = app.use(express.urlencoded({extended: true}));
app.use(express.json()) 


let pagesArray = JSON.parse(fs.readFileSync('pagesTable.json', 'utf-8'))

console.log("Number of Routes = " + pagesArray.length.toString());

pagesArray.forEach(function(pageObj){
  app.get(pageObj.name, async  function(req,res){
	  counting++;
	  if (pageObj.loaderDir != undefined){
		console.log("loaderDir  ");
		res.render(pageObj.route,{dirName:pageObj.loaderDir});
	  }
	  else{
		  if (pageObj.redirect !=undefined){
			console.log("redirect ");  
			res.redirect(pageObj.route,); 
		  }
		  else{
			  //simple
			//console.log("simple route ", req.query);  
			console.log("pageObj.route ", pageObj.route); 
			console.log(getDateTime() + " - " + req.ip);
			//console.log("Ip: ", req.ip);
			
			res.render(pageObj.route,{qs:req.query});
			//getGeoIp(req);

			//res.send( run(req.ip));
			
			
		  }
		
	  }
	  console.log(counting);
	  //console.log(`${pageObj.name} - Browsing from ${req.ipInfo.city}, ${req.ipInfo.country}` + " --- " + getDateTime());
  });
});


// app.post('/json',  function(req, res){
// 	//urlencodedParser pass as argument then we can use req to access data of urlencodedParser
// 	console.log('/json');

// 	console.log(req.body);
// 	let pathName = req.body.pathName;
// 	let filename = req.body.filename;
// 	let jsonContent = req.body.json;
// 	console.log(`Path = ${pathName}`);
// 	console.log(`File = ${filename}`);
// 	console.log(`jsonContent = ${jsonContent}`);
// 	CopyJSONFile(pathName,filename,jsonContent);
//     //console.log(request.body.name);
    
// });
// app.post('/login', urlencodedParser, function(req, res){
// 	//urlencodedParser pass as argument then we can use req to access data of urlencodedParser
// 	console.log(req.body);
// 	res.render('_PE-Front\\html\\ToDB\\welcome.html',{data:req.body});
// 	console.log(`/login - Browsing from ${req.ipInfo.city}, ${req.ipInfo.country}` + " --- " + getDateTime());
//     //console.log(request.body.name);
//     //console.log(request.body.email);
// });

// app.post('/register', urlencodedParser, function(req, res){
// 	//urlencodedParser pass as argument then we can use req to access data of urlencodedParser
// 	console.log(req.body);
// 	res.render('_PE-Front\\html\\ToDB\\welcomeRegister.html',{data:req.body});
//     //console.log(request.body.name);
//     //console.log(request.body.email);
// 	console.log(`/register - Browsing from ${req.ipInfo.city}, ${req.ipInfo.country}` + " --- " + getDateTime());
// });
// app.post('/contact-us', urlencodedParser, function(req, res){
// 	//urlencodedParser pass as argument then we can use req to access data of urlencodedParser
// 	console.log(req.body);
// 	res.render('_PE-Front\\html\\ToDB\\welcomeContact.html',{data:req.body});
// 	console.log(`/contact-us - Browsing from ${req.ipInfo.city}, ${req.ipInfo.country}` + " --- " + getDateTime());
//    //console.log(request.body.name);
//     //console.log(request.body.email);
// });
//app.get('/CHROME_ONLY/*',function(req,res){
//    //res.render('../CHROME_ONLY/Chrome.html');
//    console.log(".."+ req.url);
//    res.render(".."+ req.url);
//    //res.send('Hello');
//});

//app.get('/CHROME_ONLY/*',function(req,res){
//
 //   res.render('../CHROME_ONLY/Chrome.html');
 //   //res.send('Hello');
//});


//var server =  https.createServer(options, app);
//server.listen(port,function() {
//    console.log('Server started on ' + port);
//});

//New 
// https.createServer(options, app).listen(443,function(){
//     console.log("listen to https port");
// });

//Commented out as - do not know why it is not working on port 80
var https = require('https');
https.createServer(options,app).listen(port,function(req,res){
    console.log("Listen to https ");
   //res.writeHead(301,{"Location":"https://" + req.headers['host'] + req.url});
  // res.end();
  //res.redirect('https://' + req.headers.host +req.url);
});

// var redirectApp = express () ,
// redirectServer = http.createServer(redirectApp);

// redirectApp.use(function requireHTTPS(req, res, next) {
//   if (!req.secure) {
//     return res.redirect('https://' + req.headers.host + req.url);
//   }
//   next();
// })

//redirectServer.listen(port);

function getDateTime(){
	var date = new Date();
	return (date.toDateString() + " - " + date.toTimeString());
}
//175.32.161.107
async function  getGeoIp(req){
	var fetch_res =  await fetch(`https://ipapi.co/${req.ip}/json/`);
	
	var fetch_data =  await fetch_res.json()
	//console.log(fetch_res);
	console.log(fetch_data);
	console.log(`You are from ${fetch_data.message}`)
}
// function CopyJSONFile(pathName,filename,jsonContent){
// 	let FromFile = pathName +"/"+filename;
// 	let ToFile = pathName+"/BU/"+filename;
// 	let json = JSON.stringify(jsonContent,null,2); //convert it back to json
// 	console.log(FromFile);
// 	console.log(ToFile);
// 	fs.rename(path.resolve(__dirname,FromFile), ToFile,(err)=>{
// 		if (err){
// 			console.log("Error:" ,err);
// 		} else{
// 			console.log("move OK");
// 			fs.writeFile(FromFile, json, 'utf8', function (err) {
// 				if (err) return console.log(err);
// 				else console.log("new content");
// 			 });
// 		}
// 	});
// 	// fs.copyFile(path.resolve(__dirname,FromFile), ToFile,(err)=>{
// 	// 	if (err){
// 	// 		console.log("Error:" ,err);
// 	// 	} else{
// 	// 		console.log("copy OK");
// 	// 	}
// 	// });
// }
