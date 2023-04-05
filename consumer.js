const { Kafka } = require("kafkajs");
const {
	environment,
  kafkaOptions
} = require("./const.js");

const consumerOptiomns = {
	groupId: environment.CLIENT_ID,
	// minBytes: 5,
	// maxBytes: 1e6,
};

const kafka = new Kafka(kafkaOptions);
const consumer = kafka.consumer(consumerOptiomns);

const consume = async () => {
	await consumer.connect();
	await consumer.subscribe({
		topic: environment.TOPIC
	});
	await consumer.run({
		eachMessage: ({ message }) => {
			console.log(`received message: ${message.value}`);
		},
	});
};

consume();
