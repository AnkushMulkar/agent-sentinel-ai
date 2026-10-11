import React from 'react';

interface FooterProps {
  onOpenDocs: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onNavigateTab }) => {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        background: '#090c15',
        padding: '3rem 2rem 2rem 2rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
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
              <span style={{ fontWeight: 500, fontSize: '1.1rem', color: '#f8fafc' }}>
                AgentSentinel AI
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, fontWeight: 400 }}>
              Enterprise AI Security, OpenTelemetry Flamegraph Tracing & FinOps Cost Control Platform. Open-source infrastructure built to demonstrate engineering manager technical specs.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.8rem' }}>
                OBSERVABILITY
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li>
                  <button onClick={() => onNavigateTab('home')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    Home Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('traces')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    Flamegraph Traces
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('evals')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    Eval Suite
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.8rem' }}>
                GOVERNANCE
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li>
                  <button onClick={onOpenDocs} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    Architecture Specs
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('finops')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    FinOps Cost Engine
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('security')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    Security Sandbox
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#64748b',
          }}
        >
          <div>© 2026 AgentSentinel AI • MIT License Open Source</div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>Engineering Leadership Infrastructure Project</span>
            <span>•</span>
            <button onClick={onOpenDocs} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              View Platform Specs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
