import { Wand2, Image as ImageIcon, Share2, Settings as SettingsIcon } from 'lucide-react';
import './Navbar.css'; // Let's just create a Navbar.css or add to index.css. Wait, let's put it in index.css or a dedicated file. For simplicity, I'll put styles in index.css, so I will just use standard classes or create Navbar.css. Let's create Navbar.css for modularity.

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'generate', label: 'Generate', icon: <Wand2 size={18} /> },
    { id: 'social', label: 'Social', icon: <Share2 size={18} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> }
  ];

  return (
    <nav className="glass-panel navbar">
      <div className="navbar-brand">
        <div className="logo-icon">
          <ImageIcon size={24} color="#ffffff" />
        </div>
        <span className="logo-text">Gemini <span className="highlight">Vision</span></span>
      </div>
      
      <div className="navbar-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
