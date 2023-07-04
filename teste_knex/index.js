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


// rota precisa  == receber os dados -> 
                        //-> tentar criar uma tabela no banco
                            //-> esperar o retorno da criação ou não da tabela
                                //-> enviar de volta a resposta sobre a criação da tabela 


app.post('/create', async (req, res)=>{
    let table_name = req.body.table_name;

    let exists = await knex.schema.hasTable(table_name).then(exists =>{return exists});
    console.log("exists -->",exists);
    if (!exists){
        knex.schema.createTable(table_name, (table)=>{
            table.increments('id').primary();
            table.timestamps();
        })
        .then(data =>{
            res.json({
                status : 200,
                statusText : "OK",
                message : "Table created successfully"
            });  
        })
        .catch(err =>{
            res.send(err);
        });
    }else{
        res.json({message :'Table alredy exists'});   
    }
});

app.get('/tables', (req, res)=>{
    
    async function list_tables(){
        let response = await knex.raw("show tables").then(res =>{return res[0]});
        res.send(response);  
    }

    list_tables();
});

app.delete('/delete/:table_name', (req, res)=>{
    
    let table = req.params.table_name;
    console.log(table);

    knex.schema.dropTable(table)
    .then(response =>{
        console.log(res);
        res.json({ message :"Deleted table"});
    })
    .catch(err =>{
        console.log(err);
        res.json({message : "Failed to delete table"});
    });
    
});


app.listen(port, (req, res)=>{
    console.log("app running in port:",port);
});