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
		acks: 1, 	// can be set to -1, 0, or 1
		messages: [
			{
				key: String(i),
				value: "provola"
			},
		],
	});

};

produce();


