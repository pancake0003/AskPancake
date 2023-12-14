const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static('public'));

// Serve static files from the 'public' folder
//app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


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
  console.log('fetching');

  // Read instructions only once at the beginning
  if (!messages.find((msg) => msg.role === 'system' && msg.content !== '')) {
    const instructions = await fetchInstructions();
    updateChat('system', instructions);
  }

  // Update user message
  updateChat('user', prompt);

  // Get the total number of tokens in the conversation
  const totalTokens = messages.reduce(
    (acc, msg) => acc + msg.content.split(' ').length,0
  );

  // Set a maximum number of tokens per request
  //16385
  const maxTokensPerRequest = 4096;

  // Initialize an array to store the responses
  let responses = [];

  // Iterate over the conversation tokens in chunks
  for (let i = 0; i < totalTokens; i += maxTokensPerRequest) {
    const tokensChunk = messages
      .map((msg) => msg.content.split(' '))
      .flat()
      .slice(i, i + maxTokensPerRequest);

    // Create a chunked conversation
    const chunkedConversation = messages.map((msg) => ({ ...msg, content: tokensChunk.join(' ') }));

    // Call OpenAI API with the chunked conversation
    const completion = await openai.chat.completions.create({
      messages: chunkedConversation,
      //gpt-3.5-turbo-1106
      //gpt-4-1106-preview
      model: 'gpt-4-1106-preview',
      temperature: 1,
      max_tokens: maxTokensPerRequest,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Get the answer from the response
    const answer = completion.choices[0].message.content;

    // Add the answer to the responses array
    responses.push(answer);
  }

  // Join the responses into a single string
  const finalResponse = responses.join(' ');

  // Update the assistant message with the final response
  updateChat('assistant', finalResponse);
  console.log(messages);

  return finalResponse;
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
