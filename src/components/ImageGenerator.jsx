import { useState } from 'react';
import { Sparkles, Download, AlertCircle, Loader2 } from 'lucide-react';
import { generateImage } from '../services/gemini';
import './ImageGenerator.css';

export default function ImageGenerator({ apiKey, onRequireKey }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!apiKey) {
      onRequireKey();
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // In a real implementation with valid Imagen access, this would call the API.
      // We will simulate it if it fails or actually call it if a real key is provided.
      const imageBase64 = await generateImage(prompt, apiKey);
      setResultImage(`data:image/jpeg;base64,${imageBase64}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate image. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const a = document.createElement('a');
    a.href = resultImage;
    a.download = `gemini-vision-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="generator-container animate-fade-in">
      <div className="generator-header">
        <h1>Bring your ideas to life</h1>
        <p className="subtitle">Describe what you want to see, and Gemini Vision will create it.</p>
      </div>

      <form className="prompt-form glass-panel" onSubmit={handleGenerate}>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field prompt-input"
            placeholder="A futuristic city in the clouds with flying cars, cyberpunk style..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button 
            type="submit" 
            className="btn-primary generate-btn"
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message animate-fade-in">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="result-area">
        {isGenerating ? (
          <div className="loading-state glass-panel animate-pulse">
            <div className="loader-ring"></div>
            <p>Crafting your vision...</p>
          </div>
        ) : resultImage ? (
          <div className="image-result glass-panel animate-fade-in">
            <img src={resultImage} alt="Generated result" className="generated-image" />
            <div className="image-actions">
              <button className="btn-secondary" onClick={handleDownload}>
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state glass-panel">
            <Sparkles size={48} className="empty-icon" />
            <p>Your creation will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
