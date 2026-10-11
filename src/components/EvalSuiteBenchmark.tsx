import React, { useState } from 'react';
import type { EvalBenchmark } from '../types/sentinel';
import { BarChart3, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

interface EvalSuiteBenchmarkProps {
  benchmarks: EvalBenchmark[];
}

export const EvalSuiteBenchmark: React.FC<EvalSuiteBenchmarkProps> = ({ benchmarks: initialBenchmarks }) => {
  const [benchmarks, setBenchmarks] = useState(initialBenchmarks);
  const [isRunningEval, setIsRunningEval] = useState(false);

  const handleRunEvalSuite = () => {
    setIsRunningEval(true);
    setTimeout(() => {
      setBenchmarks(
        benchmarks.map((b) => ({
          ...b,
          passRatePercent: Math.min(100, Number((b.passRatePercent + 0.3).toFixed(1))),
          hasRegression: false,
        }))
      );
      setIsRunningEval(false);
    }, 1000);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={20} color="#ff2e4c" />
            Enterprise Model Evaluation & Hallucination Benchmark Suite
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Automated regression testing across model families for faithfulness, context precision, and safety
          </p>
        </div>

        <button
          onClick={handleRunEvalSuite}
          disabled={isRunningEval}
          className="btn-primary"
          style={{ fontSize: '0.82rem', background: 'linear-gradient(135deg, #ff2e4c 0%, #ff2e4c 100%)' }}
        >
          <RefreshCw size={15} className={isRunningEval ? 'spin' : ''} />
          {isRunningEval ? 'Executing Eval Suite (1,850 tests)...' : 'Run Full Model Evaluation Suite'}
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                <th style={{ padding: '0.75rem 1rem' }}>Test Suite Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Model Under Test</th>
                <th style={{ padding: '0.75rem 1rem' }}>Test Cases</th>
                <th style={{ padding: '0.75rem 1rem' }}>Pass Rate (%)</th>
                <th style={{ padding: '0.75rem 1rem' }}>Avg Latency</th>
                <th style={{ padding: '0.75rem 1rem' }}>Hallucination Rate</th>
                <th style={{ padding: '0.75rem 1rem' }}>Cost / 1k Runs</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((b) => (
                <tr
                  key={b.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: b.hasRegression ? 'rgba(255, 46, 76, 0.06)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#fff' }}>
                    {b.testSuiteName}
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', color: '#e4e4e7', fontWeight: 600 }}>
                    {b.modelName}
                  </td>
                  <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)' }}>
                    {b.totalTests} tests
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontWeight: 800, color: b.passRatePercent >= 98 ? '#e4e4e7' : '#e4e4e7', fontFamily: 'var(--font-mono)' }}>
                    {b.passRatePercent}%
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {b.avgLatencyMs} ms
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', color: b.hallucinationRatePercent > 1.0 ? '#ff2e4c' : '#e4e4e7' }}>
                    {b.hallucinationRatePercent}%
                  </td>
                  <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>
                    ${b.costPer1kRunsUsd.toFixed(2)}
                  </td>
                  <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                    {b.hasRegression ? (
                      <span
                        className="badge-blocked"
                        style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <AlertTriangle size={12} />
                        Regression Detected
                      </span>
                    ) : (
                      <span
                        className="badge-success"
                        style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <CheckCircle2 size={12} />
                        PASSED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
