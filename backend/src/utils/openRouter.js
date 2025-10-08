import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.OPENROUTER_API_KEY);

const openRouter = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "prompt-generator",
  },
});

export default openRouter;