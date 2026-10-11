import React from 'react';
import { X, ShieldCheck, Cpu, Lock, Layers, Award } from 'lucide-react';

interface ArchitectureDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocsModal: React.FC<ArchitectureDocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          background: '#18191d',
          borderRadius: '12px',
          border: 'none',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#ff2e4c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={18} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#f8fafc' }}>
              AgentSentinel — Platform Architecture & EM Technical Specs
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>
              Enterprise AI Reliability • FinOps Cost Governance • Eval Methodology • Security Posture
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
          <div style={{ background: '#121316', padding: '1.25rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} color="#f8fafc" />
              1. Engineering Manager Architectural Vision
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', fontWeight: 400 }}>
              Deploying autonomous AI agents into mission-critical workflow demands enterprise-grade observability, predictable cost control, deterministic evaluation benchmarks, and zero-trust security. AgentSentinel provides the reliable backbone required to scale multi-agent systems across regulated industries.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#121316', padding: '1.1rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={15} color="#f8fafc" />
                OpenTelemetry Tracing & Flamegraph DAG
              </h4>
              <ul style={{ fontSize: '0.82rem', color: '#94a3b8', paddingLeft: '1.2rem', lineHeight: '1.6', fontWeight: 400 }}>
                <li>OpenTelemetry-native trace collector capturing microsecond step durations.</li>
                <li>Flamegraph DAG visualization isolating tool calls, planning loops, and code executions.</li>
                <li>Low-overhead async agent SDK wrappers (Python / Node.js).</li>
              </ul>
            </div>

            <div style={{ background: '#121316', padding: '1.1rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Cpu size={15} color="#f8fafc" />
                FinOps & Dynamic Fallback Router
              </h4>
              <ul style={{ fontSize: '0.82rem', color: '#94a3b8', paddingLeft: '1.2rem', lineHeight: '1.6', fontWeight: 400 }}>
                <li>Real-time token cost allocation per department and agent.</li>
                <li>Dynamic fallback routing to Gemini 1.5 Flash when query complexity allows, reducing token costs by up to 75%.</li>
                <li>Circuit breaker pattern for rate-limit protection.</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#121316', padding: '1.25rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lock size={16} color="#f8fafc" />
              2. Security Compliance & Eval Suite SLA
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontWeight: 400 }}>Zero-Trust PII Masking</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>Instant Regex/NLP Sanitization</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontWeight: 400 }}>Hallucination Target</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>&lt; 0.9% across eval suite</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontWeight: 400 }}>Audit Compliance</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>SOC2 Type II & HIPAA Logged</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
