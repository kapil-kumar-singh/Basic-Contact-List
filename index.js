const express = require("express");
const path = require('path');
const port = 9000;

const db = require('./config/mongoose')
const Contacts = require('./models/contacts');

const app = express();

app.use(express.urlencoded());
app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.get('/', function(req, res){
    
    Contacts.find({}, function(err, Contacts){
        if(err){
            console.log('error in fatching contacts from db');
            return;
        }
        return res.render('contact', {
            title : "Contact List",
            Contact : Contacts
        })
    })
})

app.post('/create-contact', function(req, res){
    // console.log(req.body);
    Contacts.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if (err){
            console.log("error in creating contact", err);
            return;
        }
        // console.log(newContact);
        return res.redirect('back');
    })
})


app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    // get the id from  query inthe url
    let id = req.query.id;

    // find the contact in the database using id and delete
    Contacts.findByIdAndDelete(id, function(err){
        if (err){
            console.log('err in deleting object form database');
            return;
        }
        return res.redirect('back');
    })

})

app.listen(port, function(err){
    if (err){
        console.log("Error in running the server :", port);
        return;
    }
    console.log('Express server is running on the port : ', port);
});