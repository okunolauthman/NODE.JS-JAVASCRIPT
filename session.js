const exp=require('express');
const app=exp();
var cookieParser=require("cookie-parser");
//var genuuid=require('uuid.v4');
const session=require('express-session');
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

app.use(
	session(
	{ 
 	   name:'starmap',
  	   //genid: function(req) {
       //        console.log('session id created');
       //	       return genuuid();
 	   //}, 
  	secret: 'Shsh!Secret!',
  	resave: false,
  	saveUninitialized: true,
  	cookie: { secure: false,expires:360000 }
	})
);
app.use(cookieParser());
//================================================================
app.get('/setsessiondata', function(req, res)
{
	let name=req.query["name"];
	let value=req.query["value"];
	req.session[name]=value;
	res.send("SESSION DATA SET");	
});

app.get('/getsessiondata', function(req, res)
{
	let name=req.query["name"];
	let value=req.session[name];
	res.send(name+"="+value);	
});

app.get('/getsessionid', function(req, res)
{
	//req.session.last="dunn";//session cookie will not be created unless a session variable is set
	res.send("SESSION ID="+req.sessionID);
	//res.send("LAST=DUNN");	
});

app.get('/getsessionid2', function(req, res)
{
	res.send("SESSION.ID="+req.session.id);
});

app.get('/getsessionname', function(req, res)
{
	res.send("SESSION.NAME="+req.session.name);
});

app.get('/getsessioncookie', function(req, res){
	let name='starmap';
	var value=req.cookies.starmap;
	res.send(`${name}=${value}`);
});

app.get('/getallsessiondata', function(req, res)
{
	let output="";
	 for (let x in req.session) 
	{
		output+=(`name=${x} value=${JSON.stringify(req.session[x],null,2)}`);
	};
	res.send(output);
});

app.get('/getallcookiedata', function(req, res)
{
	let output="";
	for (let x in req.cookies) 
	{
		output+=(`name=${x} value=${JSON.stringify(req.cookies[x],null,2)}`);
	};
	res.send(output);
});

app.get('/delsession', function(req, res)
{
	req.session.destroy();
	res.send("SESION DESTROYED");
});
/*
app.get('/delsessioncookie', function(req, res)
{
	req.session = null;
	res.send("COOKIE SESION REMOVED");
});
*/
app.get('/expiresessioncookie', function(req, res)
{
	//req.session.cookie.expires = new Date().getTime();
	req.session.cookie.expires = new Date(Date.now()-1);
	//res.status(201).send(req.session);
	res.send("COOKIE SESSION EXPIRED");
});

const getjson=function(obj){return JSON.stringify(obj,null,2);}

app.get('/displaycookieraw', function(req, res){
	res.send("COOKIE="+getjson(req.cookies));
});

//================================================================

app.listen(3000);

//getsessionid
//getsessioncookie
//getsessiondata
//getcookiedata
//req.session.destroy();
//req.session = null 
//getcookiedata
