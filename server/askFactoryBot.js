require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askFactoryBot({ name, cost, quantity }) {
  try {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

    const prompt = `A client is inquiring about a raw material named "${name}". The cost is $${cost} and the quantity available is ${quantity} units. Provide a professional response from a factory assistant.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in askFactoryBot:", error);
    return "An error occurred while contacting the AI.";
  }
}

module.exports = askFactoryBot;
