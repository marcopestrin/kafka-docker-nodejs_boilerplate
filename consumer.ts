import { Kafka, Consumer, EachMessagePayload } from "kafkajs";
import { environment, kafkaConfig } from "./const";

const kafka = new Kafka(kafkaConfig);

const consumer: Consumer = kafka.consumer({
	groupId: environment.CLIENT_ID,
});

export default async function consumeMessage(topic: string) {
	await consumer.connect();
	
	await consumer.subscribe({
		topic,
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message }: EachMessagePayload) => {
			const payload = message.value?.toString() || "";
			console.log(payload);
		},
	});
};

consumeMessage(environment.TOPIC);