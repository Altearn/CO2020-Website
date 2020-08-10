const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const path = require('path');
const got = require('got');
const app = express();
const mysql = require('mysql');
app.use(express.static(path.join(__dirname, 'build')));
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

//WARNING -- Also modify NCurrencies.js
const currencies = [
    {code: 'AUD', label: 'A$', value: 1.6247, decimals: true},
    {code: 'CAD', label: 'C$', value: 1.5336, decimals: true},
    {code: 'CZK', label: 'Kč', value: 26.691, decimals: true},
    {code: 'DKK', label: 'Kr. (DKK)', value: 7.4483, decimals: true},
    {code: 'EUR', label: '€', value: 1, decimals: true},
    {code: 'HKD', label: 'HK$', value: 8.7396, decimals: true},
    {code: 'HUF', label: 'Ft', value: 353.7, decimals: false},
    {code: 'ILS', label: '₪', value: 3.9006, decimals: true},
    {code: 'JPY', label: '¥', value: 120.48, decimals: false},
    {code: 'MXN', label: 'Mex$', value: 25.6953, decimals: true},
    {code: 'NZD', label: 'NZ$', value: 1.7189, decimals: true},
    {code: 'NOK', label: 'kr (NOK)', value: 10.7163, decimals: true},
    {code: 'PHP', label: '₱', value: 55.794, decimals: true},
    {code: 'PLN', label: 'zł', value: 4.4743, decimals: true},
    {code: 'GBP', label: '£', value: 0.8957, decimals: true},
    {code: 'RUB', label: '₽', value: 80.2104, decimals: true},
    {code: 'SGD', label: 'S$', value: 1.5703, decimals: true},
    {code: 'SEK', label: 'kr (SEK)', value: 10.398, decimals: true},
    {code: 'CHF', label: 'CHf', value: 1.0625, decimals: true},
    {code: 'THB', label: '฿', value: 35.316, decimals: true},
    {code: 'USD', label: '$', value: 1.1276, decimals: true}
];

const GUILD_ID = '719527687000948797';
const DONATOR_ROLE_ID = '723308537710772265';
const DISCORD_LOGS_CHANNEL = '741717277027729450';
const PAYPAL_CLIENT = process.env.USE_PAYPAL_SANDBOX ? process.env.PAYPAL_CLIENT_SANDBOX : process.env.PAYPAL_CLIENT_live;
const PAYPAL_SECRET = process.env.USE_PAYPAL_SANDBOX ? process.env.PAYPAL_SECRET_SANDBOX : process.env.PAYPAL_SECRET_live;
const PAYPAL_BASE_URL = process.env.USE_PAYPAL_SANDBOX ? "https://api.sandbox.paypal.com" : "https://api.paypal.com"

const db = mysql.createConnection({host: "localhost", port: (process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PWD});

var discordLastValues = {
    onlineCount: null,
    memberCount: null,
    sponsors: [],
}

client.on('ready', () => {
    console.log(`Discord bot logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

db.connect(function(err) {
    if (err) {
        console.log("Error#3386");
        throw err;
    }
    console.log("Connected to database!");
});

async function make_donation_embed(discord_user, mc_uuid, value, value_eur) {
    mc_uuid = (mc_uuid === "null") ? null : mc_uuid;
    let mc_name = null;
    if (mc_uuid) {
        const {body} = await got(`https://api.mojang.com/user/profiles/${mc_uuid}/names`, { responseType: 'json' });
        mc_name = body[0].name;
    }
    const embed = {
        "title": "New donation!",
        "color": 14996107,
        "timestamp": new Date().getTime(),
        "thumbnail": discord_user ? {
          "url": discord_user.user.displayAvatarURL({ size: 512 })
        } : ( mc_uuid ? {
            "url": "https://visage.surgeplay.com/bust/512/"+mc_uuid
        } :null),
        "author": discord_user ? {
          "name": discord_user.user.username + "#" + discord_user.user.discriminator,
          "icon_url": discord_user.user.displayAvatarURL({ size: 64 })
        } : null,
        "fields": [
          {
            "name": "Value",
            "value": value + (value_eur ? ` (${value_eur}€)` : "")
          },
          {
            "name": "Discord ID",
            "value": discord_user ? discord_user.user.id : "Unknown",
            "inline": true
          },
          {
            "name": "Minecraft name",
            "value": mc_name || "Unknown",
            "inline": true
          }
        ]
      };
      if (mc_uuid) {
        
    }
      return { embed }
}

app.get('/:page', function (req, res) {
    if (req.params.page!=='api') {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

app.get('/api/discord', function (req, res) {
    const guild = client.guilds.cache.get(GUILD_ID);

    if (guild.available) {
        if (guild.memberCount) discordLastValues.memberCount = guild.memberCount;

        var tmpOnlineCount = guild.members.cache.filter(m =>
            m.presence.status === 'online'
        ).size;
        if (tmpOnlineCount) discordLastValues.onlineCount = tmpOnlineCount;

        var tmpSponsors = [];
        guild.members.cache.filter(m =>
            m.roles.cache.has('720224860919431269')
        ).forEach(data => {
            tmpSponsors.push({
                username: data.user.username,
                online: data.user.presence.status==='online',
                avatarURL: data.user.avatarURL(),
                partner: data.roles.cache.has('719599493452005459')
            });
        });
        if (tmpSponsors&&tmpSponsors.length>=10) discordLastValues.sponsors = tmpSponsors;
    }

    res.send(discordLastValues);
});

app.get('/api/whitelisted', function (req, res) {
    var finalValue = "";
    db.query("SELECT uuid FROM "+process.env.DB_NAME+".Donations WHERE uuid IS NOT NULL", function (err, result, fields) {
        if (err) {
            console.log("Error#4073");
            throw err;
        }

        for (var i = 0; i < result.length; i++) {
            finalValue+=result[i].uuid+"<br>";
        }
        res.send(finalValue);
    });
});

function get_cards(callback) {
    var finalValue = {
        top: null,
        second: null,
        third: null,
        latest: null,
        total: null,
    }
    db.query(
        "SELECT amount, amount_global, currency, uuid FROM "+process.env.DB_NAME+".Donations WHERE uuid IS NOT NULL ORDER BY amount_global DESC LIMIT 3;",
        function (err, result, fields)
    {
        if (err) {
            console.log("Error#1721");
            throw err;
        }

        finalValue.top = result.length>0?result[0]:null;
        finalValue.second = result.length>1?result[1]:null;
        finalValue.third = result.length>2?result[2]:null;

        db.query(
            "SELECT amount, amount_global, currency, uuid FROM "+process.env.DB_NAME+".Donations WHERE uuid IS NOT NULL ORDER BY id DESC LIMIT 1;",
            function (err, result, fields)
        {
            if (err) {
                console.log("Error#3333");
                throw err;
            }
    
            if (result.length===1) finalValue.latest = result[0];

            db.query(
                "SELECT SUM(amount_global) AS total FROM "+process.env.DB_NAME+".Donations;",
                function (err, result, fields)
            {
                if (err) {
                    console.log("Error#8156");
                    throw err;
                }
        
                if (result.length===1) finalValue.total = result[0].total;
                callback(finalValue);
            });
        });
    });
}

app.get('/api/cards', function (req, res) {
    get_cards(result => res.json(result));
});

app.post('/api/createOrder/:amount/:currency', function(req, res) {
    request.post(PAYPAL_BASE_URL+'/v1/oauth2/token', {
        auth: {
            user: PAYPAL_CLIENT,
            password: PAYPAL_SECRET
        },
        body: 'grant_type=client_credentials'
    }, function(err, response, body) {
        if (err) {
            console.error('Error#4415');
            console.error(err);
            return res.sendStatus(500);
        }

        request.post(PAYPAL_BASE_URL+'/v2/checkout/orders', {
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
                console.log("Error#7065");
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
    request.post(PAYPAL_BASE_URL+'/v1/oauth2/token', {
        auth: {
            user: PAYPAL_CLIENT,
            password: PAYPAL_SECRET
        },
        body: 'grant_type=client_credentials'
    }, function(err, response, body) {
        if (err) {
            console.log("Error#2993");
            console.error(err);
            return res.sendStatus(500);
        }
        
        request.post(PAYPAL_BASE_URL+'/v2/checkout/orders/' + req.params.orderId + '/capture', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+JSON.parse(body).access_token,
            }
        }, function(err, response, body) {
            if (err) {
                console.log("Error#4724");
                console.error(err);
                return res.sendStatus(500);
            }

            if (JSON.parse(body).status==='COMPLETED') {
                const capture = JSON.parse(body).purchase_units[0].payments.captures[0];
                const to_eur = Number((capture.amount.value / currencies.find(c => c.code===capture.amount.currency_code).value).toFixed(2));
                const currency_label = currencies.find(c => c.code===capture.amount.currency_code).label;

                if (req.params.discordId !== 'null' && req.params.discordId !== '') {
                    var guild = client.guilds.cache.get(GUILD_ID);
                    guild.members.fetch(req.params.discordId).then(user => {
                        guild.roles.fetch(DONATOR_ROLE_ID).then(role => {
                            user.roles.add(role, 'made a donation');
                        });
                        make_donation_embed(user, req.params.uuid, capture.amount.value+currency_label, (capture.amount.value==to_eur ? null : to_eur)).then(embed => {
                            client.channels.cache.get(DISCORD_LOGS_CHANNEL).send(embed);
                        });
                    });
                } else {
                    make_donation_embed(null, req.params.uuid, capture.amount.value+currency_label, (capture.amount.value==to_eur ? null : to_eur)).then(embed => {
                        client.channels.cache.get(DISCORD_LOGS_CHANNEL).send(embed);
                    });
                }
                
                db.query('INSERT INTO '+process.env.DB_NAME+'.Donations (amount, currency, amount_global, uuid, discordId) VALUES (?, ?, ?, ?, ?);',
                    [
                        capture.amount.value,
                        capture.amount.currency_code,
                        to_eur,
                        req.params.uuid === 'null' ? null : req.params.uuid,
                        req.params.discordId
                    ], function (err, results)
                {
                    if (err) {
                        console.log("Error#4806");
                        throw err;
                    }
                });
                res.json({
                    status: 'success'
                });
                if (req.params.uuid !== 'null') {
                    get_cards(newCards => {
                        expressWs.getWss().clients.forEach(client => client.send(JSON.stringify({ code: 600, newCards: newCards })))
                    })
                }
            }else{
                console.log("Error#6716");
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

    if (username!=='null'&&tag!=='null'&&tag.length===4) {
        // Gets all the users with that username
        const guild = client.guilds.cache.get(GUILD_ID);
        guild.members.fetch({query: username})
            .then(members => {
                if(members.array().length === 0) {
                    console.log("Error#4215");
                    res.json({status: 'error'});
                    return;
                }
                // Gets the user with the right tag
                let member = undefined;
                for(let m of members.array()) {
                    if (m.user.username === username && m.user.discriminator === tag)
                        member = m;
                }
                if(member === undefined) {
                    console.log("Error#9030");
                    res.json({status: 'error'});
                    return;
                }
                // Gets the user information
                res.send(JSON.stringify({
                    id: member.user.id,
                    avatarURL: member.user.avatarURL(),
                    username: username,
                    tag: tag,
                    status: 'success',
                }));
            }).catch(err => {
                console.log("Error#6036");
                res.json({status: 'error'});
            });
    }else{
        console.log("Error#2300");
        res.json({status: 'error'});
    }
});

/*
Websocket codes:
    600 New donation done
*/

var expressWs = require('express-ws')(app);
app.ws('/api/ws', function(ws, req) {
    console.debug("WS: New connection")
    ws.on('error', function (err) {
        console.warn(`WS: Error detected:\n ${err}`);
    });

    ws.on('close', function (code, reason) {
        console.debug(`WS: Closed with code ${code} (Reason: ${reason})`);
    });
});

app.listen(process.env.PORT || 8080);