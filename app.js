var express = require('express'),
    exphbs  = require('express-handlebars');
    // mysql = require('mysql'), 
    // myConnection = require('express-myconnection'),
    // bodyParser = require('body-parser'),
    // session = require('express-session'),
    // dataServices = require('./routes/uber_routes');

app = express();

app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use(express.static('./public' ));

app.get('/', function(req, res){
	res.render('users_login')
}); 

app.post('/', function(req, res){
    res.render('ref_nos')
});

app.post('/ref_nos', function(req, res, next){
    res.render('driver_prop')
});

app.post('/driver_datails',function(req, res, next){
    res.render('advise_driver');
})

app.get('/driver_datails',function(req, res, next){
    res.render('driver_prop');
})


app.post('/sign_up', function(req, res, next){
    res.render('driver_prop')
});

app.get('/reference_nos',function(req, res, next){
    res.render('ref_nos');
})



// app.post('/step4_ref_no', dataServices.save_driver_issues);

// app.get('/step4_ref_no', dataServices.get_ref_info)
// app.get('/users', function(req, res){
// 	res.render('users');
// }); 	

// app.get('/issues', function(req, res){
// 	res.render('step2_issues');
// }); 	

var portNr = process.env.X_GANG_PORT || 4000;

app.listen(portNr, function(){
	console.log("app started. port:3001");
});