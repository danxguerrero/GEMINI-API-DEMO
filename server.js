require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai')

const API_KEY = process.env.API_KEY

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, my goal is to be a bodybuilder." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
      {
        role: "user",
        parts: [{ text: "I want to create a workout plan based on my goal." }],
      },
      {
        role: "model",
        parts: [{text: `I can help you create a workout plan, but I need more information to make it effective and safe for you. Please tell me:

        **1. Your Current Fitness Level:**
        
        * Are you a beginner, intermediate, or advanced lifter?
        * What is your current training experience? (e.g., gym experience, specific exercises you know, etc.)
        * How many days a week can you dedicate to training?
        
        **2. Your Bodybuilding Goals:**
        
        * What specific areas`}]
      }
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const msg = "I am a beginner lifter with some gym experience. I can dedicate 5 days a week to training. I would like to have a physique like a superhero in a movie. Your response should be in JSON format with days as keys and an array of objects for the value. Each value in the array should be a workout-name, number of sets and number of sets keys along with their corresponding values.";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(response, text);
}

run();