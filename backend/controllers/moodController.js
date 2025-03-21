import { Kafka } from 'kafkajs';
import axios from 'axios';

const kafka = new Kafka({
  clientId: 'moodService',
  brokers: ['kafka:9092']  // Your broker address inside Docker
});

const producer = kafka.producer();

const submitMood = async (req, res) => {
  const { email, mood } = req.body;

  if (!email || !mood) {
    return res.status(400).json({ message: 'Email and mood are required' });
  }

  try {
    // Sentiment analysis API call (mocked for now)
    const sentimentResponse = await axios.post('http://sentiment-api/analyze', { mood });
    const moodScore = sentimentResponse.data.moodScore;

    await producer.connect();
    await producer.send({
      topic: 'mood-topic',
      messages: [
        {
          key: email,
          value: JSON.stringify({ email, moodScore }),
        },
      ],
    });
    await producer.disconnect();

    return res.status(200).json({ message: 'Mood submitted successfully' });
  } catch (error) {
    console.error('Error processing mood:', error.message);
    return res.status(500).json({ message: 'Error processing mood', error: error.message });
  }
};

export { submitMood };
