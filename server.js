const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log',log+'\n', (err)=>{
		if(err){
			console.log('Unable to append to server.log');
		}
	});
	next();
});

//maintenance page
/*app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	//res.send('<h1>Hello express!</h1>');
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Bankai Senbonzakura',
		heading: 'ichigo'
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
		heading:'byakuya'
	});
});

// /bad response with json error message property
app.get('/bad',(req,res)=>{
	res.send({
		errorMessage: 'Unable to handle request'
	})
});

app.listen(3000,()=>{
	console.log('server is up on port 3000');
});