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
      isPositive: true,
      icon: DollarSign,
      color: '#ff2e4c',
      subtitle: 'Across 14 enterprise agent deployments',
    },
    {
      title: 'Global Agent Reliability',
      value: `${metrics.globalReliabilityPercent}%`,
      change: '99.9% Target SLA',
      isPositive: true,
      icon: ShieldCheck,
      color: '#ff2e4c',
      subtitle: 'Verified by automated eval benchmarks',
    },
    {
      title: 'p95 Agent Latency SLA',
      value: `${metrics.p95LatencyMs} ms`,
      change: '-340ms vs Q2 baseline',
      isPositive: true,
      icon: Clock,
      color: '#ff2e4c',
      subtitle: 'Streaming token execution SLA',
    },
    {
      title: 'Hallucination & Fail Rate',
      value: `${metrics.hallucinationRatePercent}%`,
      change: 'Best-in-class < 1.0%',
      isPositive: true,
      icon: AlertTriangle,
      color: '#ff2e4c',
      subtitle: 'Faithfulness ground truth checks',
    },
    {
      title: 'FinOps Cost Guardrail Savings',
      value: `$${metrics.finOpsCostSavedUsd.toLocaleString()}`,
      change: 'Saved via Fallback Routing',
      isPositive: true,
      icon: PiggyBank,
      color: '#ff2e4c',
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
          <div key={idx} className="glass-card" style={{ padding: '1.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.83rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {card.title}
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: `${card.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${card.color}35`,
                }}
              >
                <Icon size={18} color={card.color} />
              </div>
            </div>

            <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.3rem' }}>
              {card.value}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: card.isPositive ? '#e4e4e7' : '#ff2e4c', fontWeight: 600 }}>
                {card.change}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
