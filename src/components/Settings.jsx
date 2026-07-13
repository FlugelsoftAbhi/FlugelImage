import { useState } from 'react';
import { Key, Save, ExternalLink, CheckCircle } from 'lucide-react';
import './Settings.css';

export default function Settings({ apiKey, onSave }) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(inputKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-container animate-fade-in">
      <div className="settings-header">
        <h2>Configuration</h2>
        <p className="subtitle">Set up your Gemini API access for image generation.</p>
      </div>

      <div className="settings-content glass-panel">
        <form onSubmit={handleSave} className="api-form">
          <div className="form-group">
            <label htmlFor="apiKey">
              <Key size={18} />
              Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              className="input-field"
              placeholder="AIzaSy..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <p className="helper-text">
              Your API key is stored securely in your browser's local storage and is never sent to our servers.
            </p>
          </div>

          <button type="submit" className="btn-primary">
            {saved ? (
              <>
                <CheckCircle size={20} />
                Saved
              </>
            ) : (
              <>
                <Save size={20} />
                Save Key
              </>
            )}
          </button>
        </form>
      </div>

      <div className="guide-card glass-panel">
        <h3>How to get a Gemini API Key</h3>
        <ol className="steps-list">
          <li>Go to <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="link">Google AI Studio <ExternalLink size={14} /></a></li>
          <li>Sign in with your Google account.</li>
          <li>Click on <strong>"Get API key"</strong> in the left navigation menu.</li>
          <li>Click <strong>"Create API key"</strong> and select a Google Cloud Project (or let it create one for you).</li>
          <li>Copy the generated key and paste it above.</li>
        </ol>
        <div className="note">
          <p><strong>Note:</strong> To use Gemini's text-to-image capabilities (Imagen), your project must have access to the Imagen models. Currently, image generation might be restricted depending on your region or account tier. If the API key doesn't work, this app will simulate a beautiful placeholder image so you can still preview the experience.</p>
        </div>
      </div>
    </div>
  );
}
