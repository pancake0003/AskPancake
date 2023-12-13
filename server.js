const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
  const instructions = await fetchInstructions();
  updateChat('system', instructions);

  updateChat('user', prompt);

  // Check the rate limit before making a request
  const rateLimitInfo = await checkRateLimit();

  if (!rateLimitInfo.exceeded) {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-4-1106-preview',
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
  } else {
    // Rate limit exceeded, handle gracefully
    return rateLimitInfo.errorMessage;
  }
}

async function checkRateLimit() {
  try {
    const usage = await openai.usage.retrieve();
    const tokensUsed = usage.data[0].usage;
    const tokensLimit = usage.data[0].limit;

    if (tokensUsed >= tokensLimit) {
      const errorMessage = `Rate limit exceeded. Please wait until the quota is renewed.`;
      return { exceeded: true, errorMessage };
    } else {
      return { exceeded: false };
    }
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return { exceeded: false };
  }
}

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
