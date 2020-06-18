const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/createOrder/:amount', function(req, res) {
    request.post('https://api.paypal.com/v1/oauth2/token', {
        auth: {
            user: 'AaOAdi1D3pHsAO3dyIHc7r6tPVVbe5FGm6rqPn9h5iW0bu4dgaY6ogjb5kGXI3tAp-oG_JYTKPGYvMBQ',
            password: 'EDL7yUldgNSkqRg6IsOIyOTc47VkF19P5Oq9CW894FiY2sT4GGombqE7rgcxXle2QMvSWsoaVADilb0b'
        },
        body: 'grant_type=client_credentials'
    }, function(err, response, body) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        request.post('https://api.paypal.com/v2/checkout/orders', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+JSON.parse(body).access_token,
            },
            body: {
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "amount": {
                            "currency_code": "USD",
                            "value": req.params.amount
                        },
                    }
                ],
            },
            json: true
        }, function(err, response, body) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }

            res.json({
                id: body.id
            });
        });
    });
});

app.post('/api/approveOrder/:orderId', function(req, res) {
    request.post('https://api.paypal.com/v1/oauth2/token', {
        auth: {
            user: 'AaOAdi1D3pHsAO3dyIHc7r6tPVVbe5FGm6rqPn9h5iW0bu4dgaY6ogjb5kGXI3tAp-oG_JYTKPGYvMBQ',
            password: 'EDL7yUldgNSkqRg6IsOIyOTc47VkF19P5Oq9CW894FiY2sT4GGombqE7rgcxXle2QMvSWsoaVADilb0b'
        },
        body: 'grant_type=client_credentials'
    }, function(err, response, body) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        
        request.post('https://api.sandbox.paypal.com/v2/checkout/orders/' + OrderID + '/capture', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+JSON.parse(body).access_token,
            }
        }, function(err, response, body) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }

            res.json({
                status: 'success'
            });
        });
    });

    var OrderID = req.params.id;
});

app.listen(process.env.PORT || 8080);