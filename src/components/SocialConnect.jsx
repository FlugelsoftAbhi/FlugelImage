import { useState } from 'react';
import { MessageCircle, Globe, Camera, Check, Plus, AlertCircle } from 'lucide-react';
import './SocialConnect.css';

export default function SocialConnect() {
  const [connections, setConnections] = useState({
    twitter: true, // Let's pretend Twitter is connected by default for demo
    instagram: false,
    facebook: false
  });

  const [loading, setLoading] = useState(null);

  const toggleConnection = (platform) => {
    setLoading(platform);
    // Simulate network request
    setTimeout(() => {
      setConnections(prev => ({ ...prev, [platform]: !prev[platform] }));
      setLoading(null);
    }, 1200);
  };

  const platforms = [
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: <MessageCircle size={24} />,
      color: '#000000',
      description: 'Automatically share your generated art to X.'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Camera size={24} />,
      color: '#E1306C',
      description: 'Post directly to your Instagram feed or stories.'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Globe size={24} />,
      color: '#1877F2',
      description: 'Share your creations with your Facebook friends.'
    }
  ];

  return (
    <div className="social-container animate-fade-in">
      <div className="social-header">
        <h2>Connect Your Accounts</h2>
        <p className="subtitle">Link your social media to share your creations instantly.</p>
      </div>

      <div className="platform-grid">
        {platforms.map(platform => {
          const isConnected = connections[platform.id];
          const isLoading = loading === platform.id;

          return (
            <div key={platform.id} className={`platform-card glass-panel ${isConnected ? 'connected' : ''}`}>
              <div className="platform-icon" style={{ color: isConnected ? platform.color : 'var(--text-secondary)' }}>
                {platform.icon}
              </div>
              <div className="platform-info">
                <h3>{platform.name}</h3>
                <p>{platform.description}</p>
              </div>
              <button 
                className={`connect-btn ${isConnected ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => toggleConnection(platform.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loader-small"></span>
                ) : isConnected ? (
                  <>
                    <Check size={18} className="text-success" />
                    Connected
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Connect
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mock-notice glass-panel">
        <AlertCircle size={20} className="text-accent" />
        <p><strong>Note:</strong> Since this is a demo, connecting these accounts only simulates the OAuth flow.</p>
      </div>
    </div>
  );
}
