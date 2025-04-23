// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// app.get('/', (req, res) => {
//   res.send('✅ Server is running');
// });

// app.post('/api/chat', async (req, res) => {
//   console.log('🔵 Incoming messages:', req.body.messages);

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-4', // or 'gpt-3.5-turbo'
//         messages: req.body.messages,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('🟢 OpenAI response:', response.data.choices?.[0]?.message?.content);
//     res.json(response.data);
//   } catch (error) {
//     console.error('🔴 Error communicating with OpenAI API:', error.response?.data || error.message);
//     res.status(500).json({
//       error: 'Failed to fetch response from OpenAI API',
//       detail: error.response?.data || error.message,
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Proxy server is running on port ${PORT}`);
// });











require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML

// OpenAI Proxy Route
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

    res.json(response.data);
  } catch (error) {
    console.error('🔴 OpenAI API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'OpenAI request failed', detail: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
