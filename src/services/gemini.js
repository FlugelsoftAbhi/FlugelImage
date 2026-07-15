/**
 * Gemini Service replaced with Hugging Face Vercel API Service
 * Handles interactions with our backend API for image generation.
 */

export async function generateImage(prompt) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image from server.');
    }

    const data = await response.json();
    
    if (data.image) {
      return data.image; // Raw base64 string
    } else {
      throw new Error('No image returned from the API.');
    }

  } catch (error) {
    console.error("API Call Failed:", error.message);
    throw error;
  }
}
