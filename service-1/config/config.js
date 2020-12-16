require('dotenv').config();

const AppConfig = {};

AppConfig.applicationPort = process.env.APP_PORT || 3000;
AppConfig.logPath = process.env.LOG_PATH || 'logs';
AppConfig.logLevel = process.env.LOG_LEVEL || 'debug';
AppConfig.externalServiceBaseUrl = process.env.EXTERNAL_SERVICE_BASE_URL || 'http://localhost:3001'

module.exports = AppConfig;
