
// Requires
const fw_root = '../framework/node_modules/';
const listEndpoints = require(fw_root+'express-list-endpoints');
const express = require(fw_root+'express');
const app = express();


const config = require('./config/config.js');

// Sessions
const session = require(fw_root+'express-session');
app.use(session({
    secret: 'secret-code',
    resave: true,
    saveUninitialized: true
}));

app.use('/api/user/auth',require('../framework/standard_routes/user/auth'));

app.listen(config.options.port);
console.log('///////');
console.log("Running on port: "+config.options.port);

//list endpoints
if(config.options.list_endpoints){
    console.log("Available Endpoints:");
    var endpoints = listEndpoints(app);
    for(index in endpoints){
        var endpoint = endpoints[index];
        console.log(endpoint.methods.join(",")+" || "+endpoint.path);
    }
}

console.log('///////');