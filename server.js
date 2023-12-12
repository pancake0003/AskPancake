const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs').promises;  // Using promises for async/await support
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Assuming you have a file named 'instructions.txt' in the same directory as your server.js
const instructionsFilePath = 'instructions.txt';

let messages = [];

async function readInstructionsFromFile() {
  try {
    const content = await fs.readFile(instructionsFilePath, 'utf-8');
    messages.push({ role: 'system', content });
    console.log('Instructions loaded successfully.');
  } catch (error) {
    console.error('Error reading instructions file:', error);
  }
}
//let messages = [{ role: 'system', content: 'you are "Joy Song", a cheerful college student. ' }];
readInstructionsFromFile();

function updateChat(role, content) {
  messages.push({ role, content });
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function callOpenAIText(prompt) {
  console.log('fetching');

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

app.post('/sendMessage', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const aiResponse = await callOpenAIText(userMessage);

    // Respond with the AI's message
    res.json({ aiResponse });
  } catch (error) {
    console.error('Error processing user message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
