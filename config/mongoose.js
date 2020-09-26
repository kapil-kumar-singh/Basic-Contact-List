// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/ContactLlist_db');

// require the connection (to check if it is successfull)
const db = mongoose.connection;

// if there is error 
db.on('error', console.error.bind(console, 'Error in connecting to db'));

// up and running then print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
})