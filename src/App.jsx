import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageGenerator from './components/ImageGenerator';
import SocialConnect from './components/SocialConnect';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [apiKey, setApiKey] = useState('');

  // Load API key from local storage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'generate' && <ImageGenerator apiKey={apiKey} onRequireKey={() => setActiveTab('settings')} />}
        {activeTab === 'social' && <SocialConnect />}
        {activeTab === 'settings' && <Settings apiKey={apiKey} onSave={handleSaveApiKey} />}
      </main>
    </div>
  );
}

export default App;
