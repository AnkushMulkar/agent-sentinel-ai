import React, { useState } from 'react';
import type { FinOpsBudgetRule } from '../types/sentinel';
import { DollarSign, ArrowRight, PiggyBank } from 'lucide-react';

interface FinOpsCostEngineProps {
  budgetRules: FinOpsBudgetRule[];
}

export const FinOpsCostEngine: React.FC<FinOpsCostEngineProps> = ({ budgetRules: initialRules }) => {
  const [budgetRules, setBudgetRules] = useState(initialRules);

  const toggleGuardrail = (id: string) => {
    setBudgetRules(
      budgetRules.map((r) =>
        r.id === id
          ? {
              ...r,
              guardrailAction: r.guardrailAction === 'FALLBACK_MODEL' ? 'ALERT_SLACK' : 'FALLBACK_MODEL',
            }
          : r
      )
    );
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DollarSign size={20} color="#ff2e4c" />
            FinOps & Dynamic Token Cost Allocation Engine
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Enterprise budget guardrails, cost-attribution per team, and automated model fallback routing
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255, 46, 76, 0.1)',
            border: '1px solid rgba(255, 46, 76, 0.3)',
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.82rem',
            color: '#e4e4e7',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <PiggyBank size={16} />
          Fallback Router Saved $6,240 This Month
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {budgetRules.map((rule) => {
          const spendPercent = Math.min(100, (rule.currentSpendUsd / rule.monthlyBudgetUsd) * 100);
          return (
            <div key={rule.id} className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>
                    {rule.teamName}
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      background: spendPercent > 85 ? 'rgba(255, 46, 76, 0.15)' : 'rgba(255, 46, 76, 0.15)',
                      color: spendPercent > 85 ? '#ff2e4c' : '#e4e4e7',
                      border: `1px solid ${spendPercent > 85 ? 'rgba(255, 46, 76, 0.3)' : 'rgba(255, 46, 76, 0.3)'}`,
                    }}
                  >
                    {spendPercent.toFixed(0)}% Budget Used
                  </span>
                </div>

                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1rem' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${spendPercent}%`,
                      background: spendPercent > 85 ? '#ff2e4c' : '#ff2e4c',
                      borderRadius: '3px',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Spent: <strong style={{ color: '#fff' }}>${rule.currentSpendUsd.toLocaleString()}</strong></span>
                  <span style={{ color: 'var(--text-muted)' }}>Cap: <strong style={{ color: '#fff' }}>${rule.monthlyBudgetUsd.toLocaleString()}</strong></span>
                </div>

                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid var(--border-color)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Automated Fallback Model Routing
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', color: '#e4e4e7', fontWeight: 600 }}>
                    <span>{rule.primaryModel}</span>
                    <ArrowRight size={14} color="#ff2e4c" />
                    <span>{rule.fallbackModel}</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Guardrail: <strong style={{ color: '#fff' }}>{rule.guardrailAction}</strong>
                </span>

                <button
                  onClick={() => toggleGuardrail(rule.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#e4e4e7',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}
                >
                  Switch Guardrail
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
