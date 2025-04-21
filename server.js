require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // ✅ allow cross-origin requests
app.use(express.json()); // ✅ parse incoming JSON

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// 🔵 Health check route
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// 🧠 Chat endpoint
app.post('/api/chat', async (req, res) => {
  console.log('🔵 Incoming messages:', req.body.messages);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: req.body.messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🟢 OpenAI reply:', response.data.choices?.[0]?.message?.content);
    res.json(response.data);
  } catch (error) {
    console.error('🔴 Error communicating with OpenAI API:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server is running on port ${PORT}`);
});
