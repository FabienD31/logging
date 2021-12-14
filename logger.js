const winston = require('winston');
const {ElasticsearchTransport} = require('winston-elasticsearch');


const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}
winston.addColors(colors);



// pour ElasticSearch
const esTransportOpts = {
    levels: 'error',
    clientOpts: { node: 'http://localhost:9200' }
};
 


// winston.add(new winston.transports.File({ filename: 'error.log' }));



const format = winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    // winston.format.printf(
    //     (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    //     ),
        )
        
        const transports = [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
            }),
            new winston.transports.File({ filename: 'logs/all.log' }),
            new winston.transports.File({ filename: 'logs/http.log',  level: 'http' }),
            
            new ElasticsearchTransport(esTransportOpts)        
        ]
        
        const Logger = winston.createLogger({
            level: level(),
            levels,
            format,
            transports,
        })


Logger.on('error', (error) => {
  console.error('Error in logger caught', error);
});


module.exports = Logger;
