// backend/utils/kafkaProducer.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'schedule-app',
  brokers: ['localhost:9092'] // adjust if using Docker container names or external IPs
});

const producer = kafka.producer();

producer.connect().catch(err => {
  console.error("Kafka Producer connection error:", err);
});

export default producer;

