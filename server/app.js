const express = require('express')
const request = require('request');
const url = require('url');
const cors = require('cors');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const  JWTDecode = require('jwt-decode');
const app = express();
const port = 3000;
const config = require('./config.json');

function isAuthorized(encToken){
    var authorized = true;
    try {
        var token = JWTDecode(encToken);
        if( Date.now() < token.nbf*1000) {
            authorized = false;
        }
        if( Date.now() > token.exp*1000) {
            authorized = false;
        }
      }
      catch (e) {
        authorized = false;
      };
    return authorized;
}
app.use(cors());
app.use(bodyParser.json());

app.post('/login', function(req, res) {
  const body = req.body;
  if(body.username !== config.auth.user  || body.password !== config.auth.pass) return res.sendStatus(401);
  var token = jwt.sign({userID: body.username}, config.auth.secret, {expiresIn: '24h'});
  res.send({token});
});

app.get('/getallmanufacturers', function (req, response) {
    if( !isAuthorized(req.headers.authorization)) return response.sendStatus(401);
    
    const apiUrl = config.server.base + "/getallmanufacturers?format=json&page=1'";
    let options = {json: true};
    
    request(apiUrl, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };

        if (!error && res.statusCode == 200) {
            response.end(JSON.stringify(body, null, 3));
        };
    });
  })


app.get('/GetMakeForManufacturer', function (req, response) {
    if( !isAuthorized(req.headers.authorization)) return response.sendStatus(401);
    const queryObject = url.parse(req.url,true).query;
    const manufacturerId = queryObject.manufacturerId;
    // TBD: error if no manufacturerId
    let options = {json: true};
    const apiUrl = `${config.server.base}/GetMakeForManufacturer/${manufacturerId}?format=json`;
    request(apiUrl, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };

        if (!error && res.statusCode == 200) {
            response.end(JSON.stringify(body, null, 3));
        };
    });
  })

app.get('/GetModelsForMakeId', function (req, response) {
    if( !isAuthorized(req.headers.authorization)) return response.sendStatus(401);
    const queryObject = url.parse(req.url,true).query;
    const makeId = queryObject.makeId;
    let options = {json: true};
    const apiUrl = `${config.server.base}/GetModelsForMakeId/${makeId}?format=json`;
    console.log('apiUrl',apiUrl);
    request(apiUrl, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };

        if (!error && res.statusCode == 200) {
            response.end(JSON.stringify(body, null, 3));
        };
    });
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))