import { HfInference } from "@huggingface/inference";
import { Buffer } from "buffer";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const API_KEY = process.env.HF_TOKEN;

    try {
      if (!API_KEY) {
        throw new Error("HF_TOKEN is not configured on the server.");
      }

      // Initialize the official Hugging Face SDK
      const hf = new HfInference(API_KEY);

      // Generate the image using FLUX.1-schnell
      const blob = await hf.textToImage({
        model: 'black-forest-labs/FLUX.1-schnell',
        inputs: prompt
      });

      // Convert the Blob to a base64 string
      const arrayBuffer = await blob.arrayBuffer();
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
