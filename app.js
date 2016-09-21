const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const port = process.env.PORT || 3000;
const conf = {
    client_id: '296453647403892',
    client_secret: '27ba5397318455347054ae151e4cf622',
    crawler_page: '1612577928971434'
};
var url = 'https://graph.facebook.com/v2.7/' + conf.crawler_page + '/posts?access_token=' + conf.client_id + '|' + conf.client_secret;
requestPages(url, 1)

function requestPages(url, times) {
    if (times == 10000) return;
    else {
        request(url, (error, response, body) => {
            console.log(url);

            fs.writeFile(__dirname + '/' + conf.crawler_page + '/pages_' + conf.crawler_page + '_' + times + '.json', body, (error) => {
                if (error) console.log(error);
            })
            let json = JSON.parse(body);
            let next = json.paging.next;
            setTimeout(function() { 
                requestPages(next, ++times);
            }, 1000);
            
        })
    }
}

