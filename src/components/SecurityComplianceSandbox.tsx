import React, { useState } from 'react';
import type { SecurityEvent } from '../types/sentinel';
import { Lock, ShieldAlert, Sparkles, ShieldCheck } from 'lucide-react';

interface SecurityComplianceSandboxProps {
  events: SecurityEvent[];
}

export const SecurityComplianceSandbox: React.FC<SecurityComplianceSandboxProps> = ({ events }) => {
  const [testInput, setTestInput] = useState<string>(
    'User request for account info. SSN: 123-45-6789 and API Key: sk_live_904128591240. Also credit card 4111-2222-3333-4444.'
  );

  const redactPii = (text: string) => {
    return text
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]')
      .replace(/\bsk_live_[a-zA-Z0-9]+\b/g, '[REDACTED_API_KEY]')
      .replace(/\b\d{4}-\d{4}-\d{4}-\d{4}\b/g, '[REDACTED_CREDIT_CARD]');
  };

  const redactedOutput = redactPii(testInput);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock size={20} color="#ff2e4c" />
          Enterprise Security, PII Redaction & Prompt Injection Sandbox
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Real-time zero-trust guardrails ensuring SOC2, HIPAA, and GDPR compliance prior to LLM dispatch
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.35rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={16} color="#ff2e4c" />
            Interactive Real-Time PII Masking Tester
          </h3>

          <div style={{ marginBottom: '0.85rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Type or paste raw payload below (includes SSN, API Key, Credit Card):
            </div>
            <textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.75rem',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#e4e4e7', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} />
              Sanitized Output (Ready for LLM Context):
            </div>
            <div
              style={{
                background: 'rgba(255, 46, 76, 0.06)',
                border: '1px solid rgba(255, 46, 76, 0.25)',
                borderRadius: '8px',
                padding: '0.75rem',
                color: '#e4e4e7',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                minHeight: '80px',
              }}
            >
              {redactedOutput}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.35rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldAlert size={16} color="#ff2e4c" />
            Prompt Injection & Threat Defense Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {events.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  fontSize: '0.8rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: '#ff2e4c' }}>
                    {evt.eventType}
                  </span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                    Confidence: {(evt.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem', fontSize: '0.76rem' }}>
                  Agent: <strong style={{ color: '#fff' }}>{evt.agentName}</strong> • {evt.timestamp}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', color: '#cbd5e1', fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.4rem', borderRadius: '4px' }}>
                  Action: {evt.actionTaken}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
