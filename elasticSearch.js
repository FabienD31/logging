const elasticsearch = require('elasticsearch');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
   hosts: [ 'https://username:password@host:port']
});

client.ping({
     requestTimeout: 10000,
 }, function(error) {
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
});
 
 client.indices.create({
     index: 'blog'
 }, function(err, resp, status) {
     if (err) {
         console.log(err);
     } else {
         console.log("create", resp);
     }
 });