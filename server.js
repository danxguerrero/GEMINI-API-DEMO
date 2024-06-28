require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai')

const API_KEY = process.env.API_KEY

const genAI = new GoogleGenerativeAI(API_KEY)

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const testQuery = async () => {
  const prompt = 'Can you generate a leg day workout?'

  const result = await model.generateContent(prompt)

  console.log(result)
}

testQuery()
