//import express from "express";
const express=require('express');
require('dotenv').config();

const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Welcome to my server!');
// });

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


let messages = [{ "role": "system", "content": "you are a helpful assitant" }]


function updateChat(role, content) {
  messages.push({ "role": role, "content": content });
}

const OpenAI = require("openai");
//import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

callOpenAIText("hi.")
async function callOpenAIText(prompt) {
  console.log("fetching")

  updateChat("user", prompt);

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo-1106",
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  let answer = completion.choices[0].message.content

  updateChat("assistant", answer);
  console.log(messages)

  return (answer);
}