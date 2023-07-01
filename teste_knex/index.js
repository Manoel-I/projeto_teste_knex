const express = require('express');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const knex = require('./database');


const port = 8080;

app.set("view engine", "ejs");
app.use(express.static('public'));

// body parser setup
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser('sdasdasdasasd'));

// configuration of session
app.use(session({
    secret : "manoel app",
    resave : false,
    saveUninitialized : true,
    cookie : {maxAge : 60000}
}));

// flash setup
app.use(flash());


app.get('/', (req, res)=>{

    /*
    let emailError = req.flash("emailError");
    let nameError = req.flash('nameError');
    let pointsError = req.flash('pointsError');

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nameError = (nameError == undefined || nameError.length == 0) ? undefined : nameError;
    pointsError = (pointsError == undefined || pointsError.length == 0) ? undefined : pointsError;

    let email = req.flash('email');
    let name = req.flash('name');
    let points = req.flash('points');

    email = (email == undefined || email.length == 0) ? undefined : email;
    name = (name == undefined || name.length == 0) ? undefined : name;
    points = (points == undefined || points.length == 0) ? undefined : points;

    */

    res.render('index');
});

app.post('/create_table', (req, res)=>{
    let table_name = req.body.table_name;
    console.log(table_name);

    knex.schema.createTable(table_name, function (table) {
        table.timestamps();
    }).then(response =>{
        console.log(response);
    }).catch(error =>{
        console.log(error);
    });

    /*
    let {email, name, points} = req.body; // destructuring json

    let emailError;
    let nameError;
    let pointsError;

    if(email == undefined || email == ''){
        emailError = "email field cannot be empty";
    }
    if(name == undefined || name == ''){
        nameError = "name field cannot be empty";
    }
    if(points == undefined || points == ''){
        pointsError = "points field cannot be empty";
    }

    if(emailError != undefined || nameError != undefined || pointsError != undefined){
        req.flash('emailError', emailError);
        req.flash('nameError', nameError);
        req.flash('pointsError', pointsError);

        req.flash('name', name);
        req.flash('email', email);
        req.flash('points', points);

        res.redirect('/');
    }else{
        res.json({
            status : 200,
            statusText : "OK"
        });
    }
    */

});


app.listen(port, (req, res)=>{
    console.log("app running in port:",port);
});