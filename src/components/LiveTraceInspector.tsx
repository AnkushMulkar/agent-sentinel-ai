import React, { useState } from 'react';
import type { AgentTrace, TraceStatus } from '../types/sentinel';
import {
  Activity,
  Play,
  Layers,
} from 'lucide-react';

interface LiveTraceInspectorProps {
  traces: AgentTrace[];
  onAddTrace: (newTrace: AgentTrace) => void;
  searchTerm: string;
}

export const LiveTraceInspector: React.FC<LiveTraceInspectorProps> = ({
  traces,
  onAddTrace,
  searchTerm,
}) => {
  const [selectedTrace, setSelectedTrace] = useState<AgentTrace>(traces[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);

  const filtered = traces.filter((t) => {
    const matchesSearch =
      t.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.modelUsed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSimulateNewTrace = () => {
    setIsSimulatingRun(true);
    setTimeout(() => {
      const newTrace: AgentTrace = {
        id: `tr-${Date.now().toString().slice(-4)}`,
        agentName: 'RealtimeFinOpsAgent',
        workflowName: 'Dynamic Token Fallback Dispatch',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        status: 'SUCCESS',
        durationMs: 480,
        modelUsed: 'gemini-1.5-pro',
        tokenUsage: {
          promptTokens: 890,
          completionTokens: 210,
          totalTokens: 1100,
          costUsd: 0.0022,
        },
        evalScores: {
          faithfulness: 0.99,
          contextPrecision: 0.97,
          toolAccuracy: 1.0,
          safetyScore: 1.0,
        },
        piiRedactionsCount: 1,
        promptInjectionDetected: false,
        steps: [
          {
            stepId: `st-${Date.now()}-1`,
            stepName: 'Incoming Token Cost Classifier',
            type: 'PLANNER',
            durationMs: 110,
            status: 'SUCCESS',
            inputSnippet: 'Evaluating query complexity...',
            outputSnippet: 'Routing query to Gemini 1.5 Pro to optimize cost.',
          },
          {
            stepId: `st-${Date.now()}-2`,
            stepName: 'FinOps Budget Router Execution',
            type: 'TOOL_CALL',
            durationMs: 220,
            status: 'SUCCESS',
            toolUsed: 'FinOpsRouter.dispatch()',
            inputSnippet: '{ costTarget: 0.003 }',
            outputSnippet: '{ status: "COMPLETED", costSavedUsd: 0.012 }',
          },
          {
            stepId: `st-${Date.now()}-3`,
            stepName: 'Faithfulness & PII Sentinel Audit',
            type: 'EVALUATOR',
            durationMs: 150,
            status: 'SUCCESS',
            inputSnippet: 'Verifying ground truth accuracy...',
            outputSnippet: 'Faithfulness: 0.99. Output verified.',
          },
        ],
      };
      onAddTrace(newTrace);
      setSelectedTrace(newTrace);
      setIsSimulatingRun(false);
    }, 800);
  };

  const getStatusBadge = (status: TraceStatus) => {
    switch (status) {
      case 'SUCCESS':
        return 'badge-success';
      case 'GUARDRAIL_BLOCKED':
        return 'badge-blocked';
      case 'FAILED':
        return 'badge-blocked';
      case 'LATENCY_DECAY':
        return 'badge-latency';
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} color="#ff2e4c" />
            Agent Execution Flamegraph & Live Telemetry Inspector
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Real-time step-by-step DAG flamegraph tracing, latency breakdown, and evaluation scores
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.45rem 0.8rem',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL" style={{ background: '#07090e' }}>All Statuses</option>
            <option value="SUCCESS" style={{ background: '#07090e' }}>Success</option>
            <option value="GUARDRAIL_BLOCKED" style={{ background: '#07090e' }}>Guardrail Blocked</option>
            <option value="LATENCY_DECAY" style={{ background: '#07090e' }}>Latency SLA Decay</option>
          </select>

          <button
            onClick={handleSimulateNewTrace}
            disabled={isSimulatingRun}
            className="btn-primary"
            style={{ fontSize: '0.82rem' }}
          >
            <Play size={15} />
            {isSimulatingRun ? 'Streaming Live Run...' : 'Simulate Agent Run'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Stream ({filtered.length} Traces)
          </div>

          {filtered.map((trace) => {
            const isSelected = selectedTrace.id === trace.id;
            return (
              <div
                key={trace.id}
                onClick={() => setSelectedTrace(trace)}
                style={{
                  padding: '0.85rem',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(255, 46, 76, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid rgba(255, 46, 76, 0.4)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                    {trace.agentName}
                  </span>
                  <span
                    className={`badge-success ${getStatusBadge(trace.status)}`}
                    style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                  >
                    {trace.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {trace.workflowName}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  <span>{trace.modelUsed}</span>
                  <span>{trace.durationMs}ms</span>
                  <span>${trace.tokenUsage.costUsd.toFixed(4)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                  {selectedTrace.agentName}
                </h3>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(168, 85, 247, 0.2)',
                    color: '#e4e4e7',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  ID: {selectedTrace.id}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Workflow: {selectedTrace.workflowName} • Executed at {selectedTrace.timestamp}
              </div>
            </div>

            <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
              <div style={{ color: '#e4e4e7', fontWeight: 700 }}>Model: {selectedTrace.modelUsed}</div>
              <div style={{ color: 'var(--text-muted)' }}>Tokens: {selectedTrace.tokenUsage.totalTokens.toLocaleString()} | Cost: ${selectedTrace.tokenUsage.costUsd.toFixed(4)}</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={16} color="#ff2e4c" />
              Flamegraph Step Execution DAG ({selectedTrace.steps.length} Nodes)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedTrace.steps.map((step, idx) => {
                const stepWidthPercent = Math.max(15, (step.durationMs / selectedTrace.durationMs) * 100);
                return (
                  <div
                    key={step.stepId}
                    style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: step.status === 'SUCCESS' ? 'rgba(255, 46, 76, 0.2)' : 'rgba(255, 46, 76, 0.2)',
                            color: step.status === 'SUCCESS' ? '#e4e4e7' : '#ff2e4c',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                          {step.stepName}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {step.type}
                        </span>
                      </div>

                      <span style={{ fontSize: '0.78rem', color: '#e4e4e7', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                        {step.durationMs} ms
                      </span>
                    </div>

                    <div
                      style={{
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginBottom: '0.65rem',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${stepWidthPercent}%`,
                          background: step.status === 'SUCCESS'
                            ? 'linear-gradient(90deg, #ff2e4c 0%, #ff2e4c 100%)'
                            : 'linear-gradient(90deg, #ff2e4c 0%, #ff2e4c 100%)',
                          borderRadius: '3px',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                      <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#94a3b8' }}>
                        <span style={{ color: '#ff2e4c', fontWeight: 700 }}>INPUT: </span>
                        {step.inputSnippet}
                      </div>
                      <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#cbd5e1' }}>
                        <span style={{ color: '#e4e4e7', fontWeight: 700 }}>OUTPUT: </span>
                        {step.outputSnippet}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
              Real-time Evaluation Metrics (Faithfulness & Grounding)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', fontSize: '0.8rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(255, 46, 76, 0.1)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255, 46, 76, 0.2)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Faithfulness</div>
                <div style={{ color: '#e4e4e7', fontWeight: 800, fontSize: '1.1rem' }}>{(selectedTrace.evalScores.faithfulness * 100).toFixed(0)}%</div>
              </div>
              <div style={{ background: 'rgba(255, 46, 76, 0.1)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255, 46, 76, 0.2)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Context Precision</div>
                <div style={{ color: '#e4e4e7', fontWeight: 800, fontSize: '1.1rem' }}>{(selectedTrace.evalScores.contextPrecision * 100).toFixed(0)}%</div>
              </div>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Tool Accuracy</div>
                <div style={{ color: '#e4e4e7', fontWeight: 800, fontSize: '1.1rem' }}>{(selectedTrace.evalScores.toolAccuracy * 100).toFixed(0)}%</div>
              </div>
              <div style={{ background: 'rgba(255, 46, 76, 0.1)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255, 46, 76, 0.2)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Safety Score</div>
                <div style={{ color: selectedTrace.evalScores.safetyScore < 0.5 ? '#ff2e4c' : '#e4e4e7', fontWeight: 800, fontSize: '1.1rem' }}>
                  {(selectedTrace.evalScores.safetyScore * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
