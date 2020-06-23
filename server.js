const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
    console.log(`Discord bot logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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

app.post('/api/approveOrder/:orderId/:discordUsername/:discordTag', function(req, res) {
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
                if (req.params.discordUsername!=='null'&&req.params.discordTag!=='null'&&req.params.discordTag.length===4) {
                    var guild = client.guilds.cache.get('719527687000948797');
                    guild.members.fetch({query: req.params.discordUsername, limit: 1}).then(users => {
                        guild.roles.fetch('723308537710772265').then(role => {
                            if (users.first().user.tag===req.params.discordUsername+'#'+req.params.discordTag) {
                                users.first().roles.add(role, 'made a donation');
                            }
                        });
                    });
                }

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