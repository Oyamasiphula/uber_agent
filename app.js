var express = require('express'),
    exphbs  = require('express-handlebars');
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    dataServices = require('./routes/uber_routes');

var dbOptions = {
        host: 'localhost',
        user: 'uber',
        password: 'Uber_Uber123',
        port: 3306,
        database: 'uber_data'
    };

app = express();

app.use(myConnection(mysql, dbOptions, 'pool'));

app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use("/static", express.static("views"))
app.use("/static", express.static("."))

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({secret: "yada yada", saveUninitialized : false, resave: true, cookie : {maxAge : 5*60000}}));
app.set("x-powered-by", false);

app.use(express.static('./public' ));

app.get('/', function(req, res){
	res.render('users_login')
}); 

app.post('/', function(req, res){
    res.render('ref_nos')
});

app.post('/ref_nos', dataServices.get_ref_info);

app.post('/driver_prop',function(req, res, next){
    res.render('advise_driver');
})

app.post('/rate_me',function(req, res, next){
    res.render('advise_driver', {msg : "Link sent to driver!"});
})


app.post('/sign_up', function(req, res, next){
    res.render('driver_prop')
});

app.get('/reference_nos',function(req, res, next){
    res.render('ref_nos');
})

app.post('consult', dataServices.get_ref_info);

app.get('present_drivers', function(req, res, next){
    res.render('present_drivers')
});

// app.post('/step4_ref_no', dataServices.save_driver_issues);

// app.get('/step4_ref_no', dataServices.get_ref_info)
// app.get('/users', function(req, res){
// 	res.render('users');
// }); 	

// app.get('/issues', function(req, res){
// 	res.render('step2_issues');
// }); 	

var portNr = process.env.X_GANG_PORT || 3003;

app.listen(portNr, function(){
	console.log("app started. port:", portNr);
});
