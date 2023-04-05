const { Kafka } = require("kafkajs");
const {
	environment,
  kafkaOptions
} = require("./const.js");

const kafka = new Kafka(kafkaOptions);
const producer = kafka.producer();

const produce = async () => {

	await producer.connect();

	await producer.send({
		topic: environment.TOPIC,
		messages: [
			{
				key: String(i),
				value: "provola"
			},
		],
	});

};

produce();


