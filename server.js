const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mysql = require('mysql');
app.use(express.static(path.join(__dirname, 'build')));
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const db = mysql.createConnection({host: "localhost", user: process.env.DB_USER, password: process.env.DB_PWD});

client.on('ready', () => {
    console.log(`Discord bot logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

db.connect(function(err) {
    if (err) console.log(err);
    console.log("Connected to database!");
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/whitelisted', function (req, res) {
    var finalValue = "";
    db.query("SELECT uuid FROM don_co2020.Donations WHERE uuid IS NOT NULL", function (err, result, fields) {
        if (err) console.log(err);

        for (var i = 0; i < result.length; i++) {
            finalValue+=result.uuid+"<br>";
        }
    });
    res.send(finalValue);
});

app.post('/api/createOrder/:amount/:currency', function(req, res) {
    request.post('https://api.sandbox.paypal.com/v1/oauth2/token', {
        auth: {
            user: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET
        },
        body: 'grant_type=client_credentials'
    }, function(err, response, body) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        request.post('https://api.sandbox.paypal.com/v2/checkout/orders', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+JSON.parse(body).access_token,
            },
            body: {
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "amount": {
                            "currency_code": req.params.currency,
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

app.post('/api/approveOrder/:orderId/:discordUsername/:discordTag/:uuid', function(req, res) {
    request.post('https://api.sandbox.paypal.com/v1/oauth2/token', {
        auth: {
            user: process.env.PAYPAL_CLIENT,
            password: process.env.PAYPAL_SECRET
        },
        body: 'grant_type=client_credentials'
    }, function(err, response, body) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        
        request.post('https://api.sandbox.paypal.com/v2/checkout/orders/' + req.params.orderId + '/capture', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+JSON.parse(body).access_token,
            }
        }, function(err, response, body) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }

            if (JSON.parse(body).status==='COMPLETED') {
                var discordId = null;
                if (req.params.discordUsername!=='null'&&req.params.discordTag!=='null'&&req.params.discordTag.length===4) {
                    var guild = client.guilds.cache.get('719527687000948797');
                    guild.members.fetch({query: req.params.discordUsername, limit: 1}).then(users => {
                        
                        discordId = users.first().user.id;

                        guild.roles.fetch('723308537710772265').then(role => {
                            if (users.first().user.tag===req.params.discordUsername+'#'+req.params.discordTag) {
                                users.first().roles.add(role, 'made a donation');
                            }
                        });
                    });
                }

                var sql = `
                    INSERT INTO don_co2020.Donations
                    (
                        amount,
                        currency`+
                        (req.params.uuid==='null'?null:', uuid')+
                        (req.params.uuid==='null'?null:', discordId')+`
                    )
                    VALUES
                    (
                        `+JSON.parse(body).purchase_units[0].payments.captures[0].amount.value+
                        `, `+JSON.parse(body).purchase_units[0].payments.captures[0].amount.currency_code+
                        (req.params.uuid==='null'?null:', '+req.param.uuid)+
                        (discordId===null?null:', '+discordId)+
                    `);`;
                
                db.query(sql, function (err, result) {
                    if (err) console.log(err);
                });

                res.json({
                    status: 'success'
                });
            }else{
                res.json({
                    status: 'error'
                });
            }
        });
    });
});

app.listen(process.env.PORT || 8080);