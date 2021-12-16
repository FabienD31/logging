const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'http://localhost:9200',
  log: 'error'
});
client.ping({
     requestTimeout: 10000,
 }, function(error) {
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.info('Everything is ok');
     }
});
 
client.indices.create({
     index: 'logs'
 }, function(err, resp, status) {
     if (err) {
         console.log(err);
     } else {
         console.log("create", resp);
     }
});
  client.index({
     index: 'logs',
     id: '1',
     type: 'error',
     body:{"@timestamp":"2021-12-14T16:05:48.179Z","log.level":"error","message":"message d'erreur","ecs":{"version":"1.6.0"},"timestamp":"2021-12-14 17:05:48"}

 }, function(err, resp, status) {
     console.log(resp);
 });
client.search({
    index: 'logs',
    type: 'error',
    body: {
        query: {
            match: {
                "log.level": 'error'
            }
        }
    }
}).then(function(resp) {
    console.log(resp);
}, function(err) {
    console.trace(err.message);
});