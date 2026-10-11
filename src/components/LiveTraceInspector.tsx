import React, { useState } from 'react';
import type { AgentTrace } from '../types/sentinel';
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

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} color="#3b82f6" />
            Agent Execution Flamegraph & Live Telemetry Inspector
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 400 }}>
            Real-time step-by-step DAG flamegraph tracing, latency breakdown, and evaluation scores
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              background: '#18191d',
              color: '#f8fafc',
              border: 'none',
              borderRadius: '6px',
              padding: '0.45rem 0.8rem',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="SUCCESS">Success</option>
            <option value="GUARDRAIL_BLOCKED">Guardrail Blocked</option>
            <option value="LATENCY_DECAY">Latency SLA Decay</option>
          </select>

          <button
            onClick={handleSimulateNewTrace}
            disabled={isSimulatingRun}
            className="btn-primary"
            style={{ fontSize: '0.82rem' }}
          >
            <Play size={14} />
            {isSimulatingRun ? 'Streaming Live Run...' : 'Simulate Agent Run'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.25rem' }}>
        <div style={{ background: '#111827', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                  background: isSelected ? '#1e293b' : '#18191d',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 500, color: isSelected ? '#ffffff' : '#f8fafc', fontSize: '0.88rem' }}>
                    {trace.agentName}
                  </span>
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 400,
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: trace.status === 'SUCCESS' ? '#3b82f6' : '#94a3b8',
                    }}
                  >
                    {trace.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 400 }}>
                  {trace.workflowName}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  <span>{trace.modelUsed}</span>
                  <span>{trace.durationMs}ms</span>
                  <span>${trace.tokenUsage.costUsd.toFixed(4)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#111827', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#f8fafc' }}>
                  {selectedTrace.agentName}
                </h3>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#94a3b8',
                    fontWeight: 400,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  ID: {selectedTrace.id}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem', fontWeight: 400 }}>
                Workflow: {selectedTrace.workflowName} • Executed at {selectedTrace.timestamp}
              </div>
            </div>

            <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 400 }}>
              <div style={{ color: '#f8fafc' }}>Model: {selectedTrace.modelUsed}</div>
              <div style={{ color: '#94a3b8' }}>Tokens: {selectedTrace.tokenUsage.totalTokens.toLocaleString()} | Cost: ${selectedTrace.tokenUsage.costUsd.toFixed(4)}</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={15} color="#3b82f6" />
              Flamegraph Step Execution DAG ({selectedTrace.steps.length} Nodes)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedTrace.steps.map((step, idx) => {
                const stepWidthPercent = Math.max(15, (step.durationMs / selectedTrace.durationMs) * 100);
                return (
                  <div
                    key={step.stepId}
                    style={{
                      background: '#18191d',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      border: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#f8fafc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.72rem',
                            fontWeight: 500,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span style={{ fontWeight: 500, color: '#f8fafc', fontSize: '0.88rem' }}>
                          {step.stepName}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            color: '#94a3b8',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {step.type}
                        </span>
                      </div>

                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 400, fontFamily: 'var(--font-mono)' }}>
                        {step.durationMs} ms
                      </span>
                    </div>

                    <div
                      style={{
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        marginBottom: '0.65rem',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${stepWidthPercent}%`,
                          background: '#3b82f6',
                          borderRadius: '2px',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                      <div style={{ background: '#121316', padding: '0.5rem', borderRadius: '4px', color: '#94a3b8' }}>
                        <span style={{ color: '#64748b', fontWeight: 500 }}>INPUT: </span>
                        {step.inputSnippet}
                      </div>
                      <div style={{ background: '#121316', padding: '0.5rem', borderRadius: '4px', color: '#f8fafc' }}>
                        <span style={{ color: '#94a3b8', fontWeight: 500 }}>OUTPUT: </span>
                        {step.outputSnippet}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#18191d', padding: '1rem', borderRadius: '8px', border: 'none' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.75rem' }}>
              Real-time Evaluation Metrics (Faithfulness & Grounding)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', fontSize: '0.8rem', textAlign: 'center' }}>
              <div style={{ background: '#121316', padding: '0.6rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Faithfulness</div>
                <div style={{ color: '#f8fafc', fontWeight: 500, fontSize: '1.05rem' }}>{(selectedTrace.evalScores.faithfulness * 100).toFixed(0)}%</div>
              </div>
              <div style={{ background: '#121316', padding: '0.6rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Context Precision</div>
                <div style={{ color: '#f8fafc', fontWeight: 500, fontSize: '1.05rem' }}>{(selectedTrace.evalScores.contextPrecision * 100).toFixed(0)}%</div>
              </div>
              <div style={{ background: '#121316', padding: '0.6rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Tool Accuracy</div>
                <div style={{ color: '#f8fafc', fontWeight: 500, fontSize: '1.05rem' }}>{(selectedTrace.evalScores.toolAccuracy * 100).toFixed(0)}%</div>
              </div>
              <div style={{ background: '#121316', padding: '0.6rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Safety Score</div>
                <div style={{ color: '#f8fafc', fontWeight: 500, fontSize: '1.05rem' }}>
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
