const {  logLevel } = require("kafkajs");

const environment = {
  TOPIC: 'my_topic',
  BROKERS: ['localhost:9092'],
  CLIENT_ID: 'my_app'
};

const kafkaOptions = {
  clientId: environment.CLIENT_ID,
	brokers: environment.BROKERS,
  // logLevel: logLevel.DEBUG,
}
module.exports = {
  environment,
  kafkaOptions
};