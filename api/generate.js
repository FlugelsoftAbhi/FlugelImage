import { Buffer } from 'buffer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const API_KEY = process.env.HF_TOKEN;
    // Using FLUX.1-schnell as it is faster and doesn't timeout as often
    const MODEL_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";

    try {
      if (!API_KEY) {
        throw new Error("HF_TOKEN is not configured on the server.");
      }

      const response = await fetch(MODEL_URL, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face API Error (${response.status}): ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString('base64');
      
      res.status(200).json({ image: base64Image });
    } catch (error) {
      console.error("Backend Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
