import { Kafka, Message, Producer } from "kafkajs";
import { kafkaConfig } from "./const";

const kafka = new Kafka(kafkaConfig);

const producer: Producer = kafka.producer();

export default async function sendMessage(topic: string, message: string) {
	try {
		await producer.connect();
	
		const kafkaMessage: Message = {
			value: message,
			key: ""
		};

		await producer.send({
			topic,
			messages: [kafkaMessage],
		});
		
	} catch (error) {
    console.error(`Error sending message: ${error}`);
	} finally {
		await producer.disconnect();
	}

}
