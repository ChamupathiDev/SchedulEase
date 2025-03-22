import Sentiment from 'sentiment';

export const submitMood = (req, res) => {
  const { mood, email } = req.body;

  if (!mood || !email) {
    return res.status(400).json({ success: false, message: 'Email and mood are required.' });
  }

  const sentiment = new Sentiment();
  const result = sentiment.analyze(mood);

  console.log(`User ${email} submitted mood: "${mood}" with sentiment score: ${result.score}`);

  res.json({ success: true, moodScore: result.score });
};


