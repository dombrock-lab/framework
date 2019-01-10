var express = require('express');
var router = express.Router();
// Body Parser required for using post data
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = require('../../modules/database');

function setPermissions(results,req){
    //if the user has no entries in the permissions table, skip
    if(results.length>0){
        //console.log(results);
        if(results[0].admin == 'true' ){
            console.log(req.body.username+" is Admin!");
            req.session.admin = true;
        }else{
            req.session.admin = false;
        }
        if(results[0].mediator == 'true' ){
            console.log(req.body.username+" is Admin!");
            req.session.mediator = true;
        }else{
            req.session.mediator = false;
        }
    }
    console.log("Done with permissions.");
}

// Login endpoint
router.post('/login/', urlencodedParser,function (req, res) {
    if (!req.body){
        // we have no request body, this was not a POST request
        res.sendStatus(400);
        return;
    } 
    if (!req.body.username || !req.body.password) {
        // user did not supply the correct information required to auth
        res.send('login failed'); 
        return;   
    }
    // we can now attempt to verify the user
    console.log('LOGIN ATTEMPT!')
    console.log('Username: '+req.body.username);
    console.log("Password: "+req.body.password);
    let verified = false;
    var sql = 'SELECT * FROM members WHERE username="'+req.body.username+'" AND password="'+req.body.password+'"';
    var query = db.query(sql);
    query.then(function(results){
        //console.log(results.length);
        if(results.length==1){
            console.log("Verified: "+req.body.username);
            req.session.user = req.body.username;
            verified = true;
            var sql2 = 'SELECT * FROM permissions WHERE member_id='+results[0].id;
            return db.query(sql2);
        }else{
            return [];
        }
    }).then(function(results){
        //console.log(results.length);
        console.log("Checking & Setting Permissions For "+req.body.username);
        setPermissions(results,req);
        if(verified){
            res.send("login success!");
        }else{
            res.send('login failed'); 
        }
    });
    
});
 
// Logout endpoint
router.get('/logout/', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

module.exports = router;