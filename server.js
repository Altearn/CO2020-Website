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

const GUILD_ID = '719527687000948797';
const DONATOR_ROLE_ID = '723308537710772265';

const db = mysql.createConnection({host: "localhost", user: process.env.DB_USER, password: process.env.DB_PWD});

client.on('ready', () => {
    console.log(`Discord bot logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/whitelisted', function (req, res) {
    var finalValue = "";
    db.query("SELECT uuid FROM don_co2020.Donations WHERE uuid IS NOT NULL", function (err, result, fields) {
        if (err) throw err;

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

app.post('/api/approveOrder/:orderId/:discordId/:uuid', function(req, res) {
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
                if (req.params.discordId!=='null' && req.params.discordId!=='') {
                    var guild = client.guilds.cache.get(GUILD_ID);
                    guild.members.fetch(req.params.discordId).then(user => {
                        guild.roles.fetch(DONATOR_ROLE_ID).then(role => {
                            user.roles.add(role, 'made a donation');
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
                        (req.params.discordId===null?null:', '+req.params.discordId)+
                    `);`;
                
                db.query(sql, function (err, result) {
                    if (err) throw err;
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

app.get('/api/discordprofile/:username/:tag', function(req, res) {

    const username = req.params.username;
    const tag = req.params.tag;

    function error(msg) {
        console.error('Error: ' + req.originalUrl + '\nFailed with:');
        console.error(msg);
        res.json({status: 'error'});
    }

    if (username!=='null'&&tag!=='null'&&tag.length===4) {
        // Gets all the users with that username
        const guild = client.guilds.cache.get(GUILD_ID);
        guild.members.fetch({query: username})
            .then(members => {
                if(members.array().length === 0) {
                    error("Couldn't find user: No user with that name");
                    return;
                }
                // Gets the user with the right tag
                let member = undefined;
                for(let m of members.array()) {
                    if (m.user.username === username && m.user.discriminator === tag)
                        member = m;
                }
                if(member === undefined) {
                    error("Couldn't find user: No users with that name and tag");
                    return;
                }
                // Gets the user information
                res.send(JSON.stringify({
                    id: member.user.id,
                    avatarURL: member.user.avatarURL(),
                    nickname: member.nickname,
                    username: username,
                    tag: tag,
                    status: 'success',
                }));
            })
            .catch(err => error("Error while processing users list\n"+err));
    }
    else
        error("Malformatted request");
});

app.listen(process.env.PORT || 8080);