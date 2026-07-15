export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    const API_KEY = process.env.HF_TOKEN;
    const MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

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
        throw new Error(`API Error: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Return raw base64 string
      const base64Image = buffer.toString('base64');
      
      res.status(200).json({ image: base64Image });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
