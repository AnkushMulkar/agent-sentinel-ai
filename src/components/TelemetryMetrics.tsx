import React from 'react';
import type { EnterprisePlatformMetrics } from '../types/sentinel';
import { DollarSign, ShieldCheck, Clock, AlertTriangle, PiggyBank } from 'lucide-react';

interface TelemetryMetricsProps {
  metrics: EnterprisePlatformMetrics;
}

export const TelemetryMetrics: React.FC<TelemetryMetricsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Monthly Token Spend',
      value: `$${metrics.totalMonthlyTokenSpendUsd.toLocaleString()}`,
      change: 'Budget Utilization: 68%',
      icon: DollarSign,
      subtitle: 'Across 14 enterprise agent deployments',
    },
    {
      title: 'Global Agent Reliability',
      value: `${metrics.globalReliabilityPercent}%`,
      change: '99.9% Target SLA',
      icon: ShieldCheck,
      subtitle: 'Verified by automated eval benchmarks',
    },
    {
      title: 'p95 Agent Latency SLA',
      value: `${metrics.p95LatencyMs} ms`,
      change: '-340ms vs Q2 baseline',
      icon: Clock,
      subtitle: 'Streaming token execution SLA',
    },
    {
      title: 'Hallucination & Fail Rate',
      value: `${metrics.hallucinationRatePercent}%`,
      change: 'Best-in-class < 1.0%',
      icon: AlertTriangle,
      subtitle: 'Faithfulness ground truth checks',
    },
    {
      title: 'FinOps Cost Guardrail Savings',
      value: `$${metrics.finOpsCostSavedUsd.toLocaleString()}`,
      change: 'Saved via Fallback Routing',
      icon: PiggyBank,
      subtitle: 'Automated low-cost model dispatch',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        margin: '1.5rem 0',
      }}
    >
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} style={{ background: '#111827', borderRadius: '10px', padding: '1.25rem', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 400 }}>
                {card.title}
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={16} color="#3b82f6" />
              </div>
            </div>

            <div style={{ fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.02em', color: '#f8fafc', marginBottom: '0.3rem' }}>
              {card.value}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>
              <span style={{ color: '#94a3b8' }}>
                {card.change}
              </span>
              <span>{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
