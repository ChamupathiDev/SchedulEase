// backend/consumers/analyticsConsumer.js
import dotenv from "dotenv";
import { Kafka } from "kafkajs";
import mongoose from "mongoose";
import AdjustmentEvent from "../models/AdjustmentEvent.js";

dotenv.config();

async function startAnalyticsConsumer() {
  // 1) Connect to Mongo
  await mongoose.connect(process.env.MONGO);

  // 2) Connect to Kafka
  const kafka = new Kafka({
    clientId: "analytics-service",
    brokers: ["localhost:9092"],
  });
  const consumer = kafka.consumer({ groupId: "analytics-group" });
  await consumer.connect();
  await consumer.subscribe({
    topic: "scheduleAdjustments",
    fromBeginning: false,
  });

  // 3) Consume and Save
  await consumer.run({
    eachMessage: async ({ message }) => {
      const { email, score, suggestion, adjustments } = JSON.parse(
        message.value.toString(),
      );
      // Save minimal record for analytics
      await AdjustmentEvent.create({
        email,
        score,
        suggestion,
        adjustments: (adjustments || []).map((a) => ({
          moduleId: a.moduleId,
          oldStartTime: a.oldStartTime,
          oldEndTime: a.oldEndTime,
          proposedStartTime: a.proposedStartTime,
          proposedEndTime: a.proposedEndTime,
          moduleName: a.moduleName, // only if you sent it and add to schema
        })),
      });
    },
  });

  console.log("📊 Analytics consumer running…");
}

startAnalyticsConsumer().catch((err) => {
  console.error(err);
  process.exit(1);
});
