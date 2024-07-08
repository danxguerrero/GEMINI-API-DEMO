require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai')

const API_KEY = process.env.API_KEY

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

let experienceOptions = ["Beginner", "Intermediate", "Advanced"]
let pushOrPullOptions = ["pull", "push"]
let focusAreaOptions = ["Upper Body", "Lower Body"]
let workoutTypeOptions = ["Body Building", "Strength Training"]

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

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

  let experience = experienceOptions[getRandomIndex(experienceOptions)]
  let pushOrPull = pushOrPullOptions[getRandomIndex(pushOrPullOptions)]
  let focusArea = focusAreaOptions[getRandomIndex(focusAreaOptions)]
  let workoutType = workoutTypeOptions[getRandomIndex(workoutTypeOptions)]

  const msg = `I am looking for a ${experience} workout. Can you please create a ${workoutType} ${focusArea} ${pushOrPull} workout.Your response should be in JSON format with workout as the key. Please do not include any additional text or important notes in your response. I only need the JSON do not place the JSON in a block quote. The json should follow this format:
  
  { 
    experience: "Beginner"
    pushOrPull: "pull"
    focusArea: "Upper Body"
    workoutType: "Body Building"
    workout: [
  {
    workoutName: "squat",
    sets: 3,
    minRep: 8,
    maxRep: 10
  },
  {
    workoutName: "lunge",
    sets: 3,
    minRep: 8,
    maxRep: 10
  },
]}
  
  `;

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(response, text);
}

run();