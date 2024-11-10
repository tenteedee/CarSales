// controllers/chatController.js
import OpenAI from 'openai';
import { TOGETHER_AI_API_KEY, OPENAI_API_KEY } from '../../config/Config.js';

export const getChatResponse = async (req, res) => {
  const { message } = req.body;
  const openai = new OpenAI();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      apiKey: OPENAI_API_KEY,
      max_tokens: 200,
      messages: [
        {
          role: 'system',
          content: 'You are an expert about cars, engines and realted topics.',
        },
        { role: 'user', content: message },
      ],
    });

    const botMessage = completion.choices[0].message.content;
    res.json({ message: botMessage });
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(500).json({ error: 'Error in fetching response from OpenAI.' });
  }
};

export const getChatResponseTogetherAI = async (req, res) => {
  const { message } = req.body;
  try {
    const client = new OpenAI({
      apiKey: TOGETHER_AI_API_KEY,
      baseURL: 'https://api.together.xyz/v1',
    });
    console.log(client.apiKey);

    const response = await client.chat.completions.create({
      model: 'meta-llama/Llama-3-8b-chat-hf',
      messages: [
        {
          role: 'user',
          content:
            'You are an expert about cars, engines and realted topics. Using number bullets, give me a response to: ' +
            message,
        },
      ],
      max_tokens: 200,
    });

    const botMessage = response.choices[0].message.content;
    res.json({ message: botMessage });
  } catch (error) {
    console.error('Error fetching response:', error);
    res
      .status(500)
      .json({ error: 'Error in fetching response from ToghetherAI.' });
  }
};
