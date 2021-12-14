const winston = require('winston');
// const {ElasticsearchTransport} = require('winston-elasticsearch');

const customFormat = winston.format.printf(i => {
	return `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}`;
});

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);


const infoAndWarnFilter = winston.format((info, opts) => { 
	return info.level === 'info' || info.level === 'warn' ? info : false
})
const httpFilter = winston.format((info, opts) => {
  return info.level === 'http' ? info : false
})

const errorFilter = winston.format((info, opts) => { 
	return info.level === 'error' ? info : false 
})

var transports = [
	new (winston.transports.File)({
		name: 'Error Logs',
		filename: './logs/error.log',
		datePattern: 'YYYY-MM-DD',
		maxSize: '128m',
		maxFiles: '14d',
		level: 'warn',
		format: winston.format.combine(
			errorFilter(),
			winston.format.timestamp(),
			customFormat
		)
	}),
	new (winston.transports.File)({
		name: 'INFO logs',
		filename: './logs/all.log',
		datePattern: 'YYYY-MM-DD',
		maxSize: '128m',
		maxFiles: '14d',
		level: 'info',
		format: winston.format.combine(
			infoAndWarnFilter(),
			winston.format.timestamp(),
			customFormat
		)
  }),
  	new (winston.transports.File)({
		name: 'HTTP logs',
		filename: './logs/http.log',
		datePattern: 'YYYY-MM-DD',
		maxSize: '128m',
		maxFiles: '14d',
		level: 'http',
		format: winston.format.combine(
			httpFilter(),
			winston.format.timestamp(),
			customFormat
		)
	}),
	new (winston.transports.Console)({		
    level: 'http',
		json: false,
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	})
]

var logger = winston.createLogger({
	transports: transports,
	exitOnError: false,
	format: winston.format.combine(
		winston.format.timestamp(),
		customFormat
	)
})
module.exports = logger;
