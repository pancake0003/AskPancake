const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios'); // Use 'axios' instead of 'node-fetch'
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static('public'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

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
    model: 'gpt-4-1106-preview', // Change to the desired GPT-4 model identifier
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

    // Respond with the AI's message as a JSON object
    res.json({ aiResponse });
  } catch (error) {
    console.error('Error processing user message:', error);
    res.status(500).json({ aiResponse: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
