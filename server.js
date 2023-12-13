const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios'); // Use 'axios' instead of 'node-fetch'
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static('public'));

let messages = [{ role: 'system', content: '' }];

function updateChat(role, content) {
  messages.push({ role, content });
}

async function fetchInstructions() {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/pancake0003/AskPancake/main/instructions.txt');
    return response.data;
  } catch (error) {
    console.error('Error fetching instructions:', error);
    return 'Failed to fetch instructions';
  }
}

async function callOpenAIText(prompt) {
  console.log('fetching');

  const instructions = await fetchInstructions();
  updateChat('system', instructions);

  updateChat('user', prompt);

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo-1106',
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  let answer = completion.choices[0].message.content;

  updateChat('assistant', answer);
  console.log(messages);

  return answer;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/sendMessage', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const aiResponse = await callOpenAIText(userMessage);

    res.json({ aiResponse });
  } catch (error) {
    console.error('Error processing user message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
