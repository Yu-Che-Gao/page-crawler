const express = require('express');
const app = express();
const request = require('request');
const graph = require('fbgraph');
const url = 'https://graph.facebook.com/v2.7/1612577928971434/posts?access_token=' + accessToken;
const conf = {
    client_id: '296453647403892',
    client_secret: '27ba5397318455347054ae151e4cf622',
    redirect_uri: 'http://fb-page-crawler.herokuapp.com/callback'
};

app.get('/', (req, res) => {
    graph.get('me?fields=id,name', (err, res) => {
        if(err) res.redirect('/login');
        res.send(res);
    })
})

app.get('/login', (req, res) => {
    let authUrl = graph.getOauthUrl({
        client_id: conf.client_id
        , redirect_uri: conf.redirect_uri
    });

    res.redirect(authUrl);

    graph.authorize({
        client_id: conf.client_id
        , redirect_uri: conf.redirect_uri
        , client_secret: conf.client_secret
        , code: req.query.code
    }, (err, facebookRes) => {
        res.redirect('/');
    });
})