import React from 'react';

export const FeatureShowcase: React.FC = () => {
  const features = [
    {
      badge: '01. OpenTelemetry Tracing',
      title: 'Distributed Agent Execution Traces',
      description:
        'Capture multi-step agent tool calls, prompt/completion latency breakdowns, and model token usage metrics via standard OpenTelemetry HTTP/gRPC collectors.',
      metrics: ['Span Execution Paths', 'Latency Breakdown', 'Token Telemetry', 'Error Traceback'],
    },
    {
      badge: '02. Security & Guardrails',
      title: 'Real-Time PII & Prompt Injection Defense',
      description:
        'Intercept malicious prompt injection attempts and automatically sanitize sensitive PII (SSNs, API Keys, credit cards) before sending payloads to third-party LLMs.',
      metrics: ['SSN Redaction', 'API Key Redaction', 'Injection Interceptor', 'SOC2 Audit Log'],
    },
    {
      badge: '03. FinOps & Cost Optimization',
      title: 'Multi-Model Token Spend Control',
      description:
        'Analyze model unit economics, track real-time token expenditure across Gemini, OpenAI, and Anthropic, and receive automated cost anomaly alerts.',
      metrics: ['Token Spend Analytics', 'Model Routing Optimization', 'Budget Thresholds', 'Cost Anomaly Alerts'],
    },
  ];

  return (
    <section style={{ padding: '3rem 0 2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            fontWeight: 500,
            color: '#f8fafc',
            marginBottom: '0.6rem',
            letterSpacing: '-0.01em',
          }}
        >
          Mission-Critical AI Infrastructure Observability
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.0rem', fontWeight: 400, maxWidth: '600px', margin: '0 auto' }}>
          Deploy production AI agents with total confidence, ironclad security guardrails, and granular cost control.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#18191d',
              borderRadius: '10px',
              padding: '1.8rem',
            }}
          >
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 400,
                color: '#ff2e4c',
                marginBottom: '1rem',
              }}
            >
              {item.badge}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.6rem' }}>
              {item.title}
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.92rem', fontWeight: 400, lineHeight: 1.6, marginBottom: '1.2rem' }}>
              {item.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {item.metrics.map((m, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#cbd5e1',
                  }}
                >
                  • {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
