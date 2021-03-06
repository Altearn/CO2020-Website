const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const path = require('path');
const got = require('got');
const app = express();
const mysql = require('mysql');
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
const DISCORD_DONATOR_ROLE = '723308537710772265';
const DISCORD_LOGS_CHANNEL = '719603500044124231';
const DISCORD_SMALLDONATOR_ROLE = '742116043165794395';
const PAYPAL_CLIENT = process.env.USE_PAYPAL_SANDBOX ? process.env.PAYPAL_CLIENT_SANDBOX : process.env.PAYPAL_CLIENT_live;
const PAYPAL_SECRET = process.env.USE_PAYPAL_SANDBOX ? process.env.PAYPAL_SECRET_SANDBOX : process.env.PAYPAL_SECRET_live;
const PAYPAL_BASE_URL = process.env.USE_PAYPAL_SANDBOX ? "https://api.sandbox.paypal.com" : "https://api.paypal.com"

const db = mysql.createPool({host: "localhost", port: (process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PWD});

var discordLastValues = {
    onlineCount: null,
    memberCount: null,
    sponsors: [],
}

client.on('ready', () => {
    console.log(`Discord bot logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

// db.connect(function(err) {
db.on('connection', function (connection) {
    // if (err) {
    //     console.log("Error#3386");
    //     throw err;
    // }
    console.log("Connected to database!");
});

async function make_donation_embed(discord_user, mc_uuid, value, value_eur) {
    mc_uuid = (mc_uuid === "null") ? null : mc_uuid;
    let mc_name = null;
    if (mc_uuid) {
        const {body} = await got(`https://api.minetools.eu/uuid/${mc_uuid}`, { responseType: 'json' });
        mc_name = body.name;
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
      
      return { embed }
}

function refresh_roles(discord_id) {
    db.query(
        "SELECT SUM(amount_global) total FROM "+process.env.DB_NAME+".Donations WHERE discordID="+discord_id+";",
        function (err, result, fields)
    {
        if (err) return;
        let sum = result[0].total;
        if (sum < 1) return;
        var guild = client.guilds.cache.get(GUILD_ID);
        guild.members.fetch(discord_id).then(user => {
            let roles = [];
            if (sum >= 1 && !user.roles.cache.has(DISCORD_SMALLDONATOR_ROLE)) {
                roles.push(DISCORD_SMALLDONATOR_ROLE)
            }
            if (sum >= 2 && !user.roles.cache.has(DISCORD_DONATOR_ROLE)) {
                roles.push(DISCORD_DONATOR_ROLE)
            }
            if (roles.length > 0) {
                sum = Math.round((sum + Number.EPSILON) * 100) / 100;
                user.roles.add(roles, `donated ${sum}€`)
            }
        });
    });
}

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

app.get('/api/whitelisted/1', function (req, res) {
    var finalValue = "";
    db.query("SELECT uuid FROM "+process.env.DB_NAME+".Donations WHERE uuid IS NOT NULL AND amount_global>=1", function (err, result, fields) {
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

app.get('/api/whitelisted/5', function (req, res) {
    var finalValue = "";
    db.query("SELECT uuid FROM "+process.env.DB_NAME+".Donations WHERE uuid IS NOT NULL AND amount_global>=2", function (err, result, fields) {
        if (err) {
            console.log("Error#2456");
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
        "SELECT amount, amount_global, currency, uuid, discordId FROM "+process.env.DB_NAME+".Donations ORDER BY amount_global DESC LIMIT 3;",
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
            "SELECT amount, amount_global, currency, uuid, discordId FROM "+process.env.DB_NAME+".Donations ORDER BY id DESC LIMIT 1;",
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
                [finalValue.top, finalValue.second, finalValue.third, finalValue.latest].forEach(e => {
                    if (!e) return;
                    if (e.discordId) {
                        e.username = client.users.cache.get(e.discordId).username;
                        e.avatar = client.users.cache.get(e.discordId).displayAvatarURL();
                    } else {
                        e.username = "Anonymous";
                        e.avatar = "https://crafatar.com/renders/body/08831584-f29-40e0-b572-d1ae7363ec96.png?overlay&default=MHF_"+(Math.random()>=0.5?"Steve":"Alex");
                    }
                    e.isDiscordAvatar = Boolean(e.discordId && !e.uuid);
                })
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

app.post('/api/approveOrder/', function(req, res) {
    // request.post(PAYPAL_BASE_URL+'/v1/oauth2/token', {
    //     auth: {
    //         user: PAYPAL_CLIENT,
    //         password: PAYPAL_SECRET
    //     },
    //     body: 'grant_type=client_credentials'
    // }, function(err, response, body) {
    //     console.debug("TEST 2");
    //     if (err) {
    //         console.log("Error#2993");
    //         console.error(err);
    //         return res.sendStatus(500);
    //     }
    //     console.debug("TEST 3");
    //     request.post(PAYPAL_BASE_URL+'/v2/checkout/orders/' + req.body.orderId + '/capture', {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer "+JSON.parse(body).access_token,
    //         }
    //     }, function(err, response, body) {
    //         if (err) {
    //             console.log("Error#4724");
    //             console.error(err);
    //             return res.sendStatus(500);
    //         }

    //         if (JSON.parse(body).status==='COMPLETED') {
                // const capture = JSON.parse(req.body).details.purchase_units[0].payments.captures[0];
                const capture = req.body.capture;
                const to_eur = Number((capture.amount.value / currencies.find(c => c.code===capture.amount.currency_code).value).toFixed(2));
                req.body.discordId = (req.body.discordId !== 'null' && req.body.discordId !== '') ? req.body.discordId : null;
                const currency_label = currencies.find(c => c.code===capture.amount.currency_code).label;

                if (req.body.discordId) {
                    var guild = client.guilds.cache.get(GUILD_ID);
                    guild.members.fetch(req.body.discordId).then(user => {
                        make_donation_embed(user, req.body.uuid, capture.amount.value+currency_label, (capture.amount.value==to_eur ? null : to_eur)).then(embed => {
                            client.channels.cache.get(DISCORD_LOGS_CHANNEL).send(embed);
                        });
                    });
                } else {
                    make_donation_embed(null, req.body.uuid, capture.amount.value+currency_label, (capture.amount.value==to_eur ? null : to_eur)).then(embed => {
                        client.channels.cache.get(DISCORD_LOGS_CHANNEL).send(embed);
                    });
                }
                
                db.query('INSERT INTO '+process.env.DB_NAME+'.Donations (amount, currency, amount_global, uuid, discordId, ref, firstName, lastName, email, address, city, postalCode, state, country, phone, gender, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                    [
                        capture.amount.value,
                        capture.amount.currency_code,
                        to_eur,
                        req.body.uuid === 'null' ? null : req.body.uuid,
                        req.body.discordId === 'null' ? null : req.body.discordId,
                        req.body.ref === 'null' ? null : req.body.ref,
                        req.body.firstName||null,
                        req.body.lastName||null,
                        req.body.email||null,
                        req.body.address||null,
                        req.body.city||null,
                        req.body.postalCode||null,
                        req.body.state||null,
                        req.body.country||null,
                        req.body.phone||null,
                        req.body.gender||null,
                        req.body.age||null,
                    ], function (err, results)
                {
                    if (err) {
                        console.log("Error#4806");
                        throw err;
                    }
                    if (req.body.discordId) {
                        refresh_roles(req.body.discordId)
                    }
                });
                res.json({
                    status: 'success'
                });
                get_cards(newCards => {
                    expressWs.getWss().clients.forEach(client => client.send(JSON.stringify({ code: 600, newCards: newCards })))
                })
            });
//             else{
//                 console.log("Error#6716");
//                 res.json({
//                     status: 'error'
//                 });
//             }
//         });
//     });
// });

app.post('/api/discordprofile-id', function (req, res) {
    if (!req.body.id) {
        res.status(422).send("Missing parameter");
        return; 
    }

    client.users.fetch(req.body.id).then(user => {
        res.json({
            status: "success",
            avatarURL: user.displayAvatarURL(),
            username: user.username,
            tag: user.tag
        })
    }).catch(err => {
        res.json({ status: 'error' })
    })
})


app.post('/api/discordprofile', function(req, res) {

    const username = req.body.username;
    const tag = req.body.tag;
    if (!username || !tag) {
        res.status(422).send("Missing parameter(s)");
        return; 
    }

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

const root = require('path').join(__dirname, 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.listen(process.env.PORT || 8080);