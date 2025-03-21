import { Kafka } from 'kafkajs';
import Schedule from '../models/ScheduleModel.js';

const kafka = new Kafka({
  clientId: 'scheduleService',
  brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'schedule-group' });

const consumeMoodEvents = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'mood-topic', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { email, moodScore } = JSON.parse(message.value.toString());
      console.log(`Received mood event for ${email} with score ${moodScore}`);

      try {
        const schedules = await Schedule.find({ email });

        // Example adjustment logic (simplified)
        for (let sched of schedules) {
          if (sched.scheduleType === 'flex' && moodScore < 0.5) {
            // Delay start time by 1 hour for low mood
            sched.startTime = new Date(sched.startTime.getTime() + 60 * 60 * 1000);
            sched.endTime = new Date(sched.endTime.getTime() + 60 * 60 * 1000);
            await sched.save();
          }
        }
        console.log(`Schedules adjusted for ${email}`);
        // Optionally: Send notification (WebSocket or API)
      } catch (err) {
        console.error(`Error adjusting schedule for ${email}:`, err.message);
      }
    },
  });
};

consumeMoodEvents();
