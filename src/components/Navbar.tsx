import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openDocs,
}) => {
  return (
    <nav
      style={{
        background: '#0b0f19',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0.85rem 2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Clean Minimal Brand */}
        <div
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>A</span>
          </div>
          <span style={{ fontWeight: 500, fontSize: '1.0rem', color: '#f8fafc', letterSpacing: '-0.01em' }}>
            AgentSentinel
          </span>
        </div>

        {/* Minimal Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'traces', label: 'Traces' },
            { id: 'evals', label: 'Evals' },
            { id: 'finops', label: 'FinOps' },
            { id: 'security', label: 'Security' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: isActive ? '#60a5fa' : '#94a3b8',
                  fontWeight: 400,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  padding: '0.3rem 0',
                  borderBottom: isActive ? '1px solid #60a5fa' : '1px solid transparent',
                  transition: 'color 0.15s ease',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Single Essential Action */}
        <button
          onClick={openDocs}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            fontSize: '0.85rem',
            fontWeight: 400,
            cursor: 'pointer',
          }}
        >
          Architecture Spec →
        </button>
      </div>
    </nav>
  );
};
