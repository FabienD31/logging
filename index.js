const express = require('express');
const logger = require('./logger.js');

const app = express();

const PORT = 3000;

app.get('/', (_, res) => {
    res.status(200).send('Hello!'),
    logger.http(res.statusCode);
})
logger.debug('message de debug');
logger.info('message d\'info');
logger.warn('message d\'avertissement');
logger.error('message d\'erreur');


app.listen(PORT, () => { logger.info("app is running") });