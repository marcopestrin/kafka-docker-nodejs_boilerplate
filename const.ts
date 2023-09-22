import { KafkaConfig } from "kafkajs";

export const environment = {
  TOPIC: 'radar-simulator',
  BROKERS: ['localhost:9092'],
  CLIENT_ID: 'my_app'
};

export const kafkaConfig: KafkaConfig = {
  clientId: environment.CLIENT_ID,
	brokers: environment.BROKERS,
};