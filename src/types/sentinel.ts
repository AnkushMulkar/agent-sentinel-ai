export type TraceStatus = 'SUCCESS' | 'FAILED' | 'LATENCY_DECAY' | 'GUARDRAIL_BLOCKED';
export type ModelFamily = 'gemini-1.5-pro' | 'claude-3-5-sonnet' | 'gpt-4o' | 'llama-3.3-70b';

export interface TraceStep {
  stepId: string;
  stepName: string;
  type: 'PLANNER' | 'TOOL_CALL' | 'CODE_EXEC' | 'EVALUATOR';
  durationMs: number;
  status: 'SUCCESS' | 'ERROR';
  inputSnippet: string;
  outputSnippet: string;
  toolUsed?: string;
}

export interface AgentTrace {
  id: string;
  agentName: string;
  workflowName: string;
  timestamp: string;
  status: TraceStatus;
  durationMs: number;
  modelUsed: ModelFamily;
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    costUsd: number;
  };
  evalScores: {
    faithfulness: number; // 0 - 1.0
    contextPrecision: number; // 0 - 1.0
    toolAccuracy: number; // 0 - 1.0
    safetyScore: number; // 0 - 1.0
  };
  piiRedactionsCount: number;
  promptInjectionDetected: boolean;
  steps: TraceStep[];
}

export interface EvalBenchmark {
  id: string;
  testSuiteName: string;
  modelName: ModelFamily;
  totalTests: number;
  passRatePercent: number;
  avgLatencyMs: number;
  hallucinationRatePercent: number;
  costPer1kRunsUsd: number;
  hasRegression: boolean;
}

export interface FinOpsBudgetRule {
  id: string;
  teamName: string;
  monthlyBudgetUsd: number;
  currentSpendUsd: number;
  primaryModel: ModelFamily;
  fallbackModel: ModelFamily;
  guardrailAction: 'FALLBACK_MODEL' | 'RATE_LIMIT' | 'ALERT_SLACK';
  status: 'ACTIVE' | 'BREACHED';
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: 'PII_REDACTION' | 'PROMPT_INJECTION' | 'API_KEY_LEAK';
  agentName: string;
  confidenceScore: number;
  rawSnippet: string;
  redactedSnippet: string;
  actionTaken: string;
}

export interface EnterprisePlatformMetrics {
  totalMonthlyTokenSpendUsd: number;
  globalReliabilityPercent: number; // e.g. 99.4%
  p95LatencyMs: number;
  totalTracesIngested: number;
  hallucinationRatePercent: number;
  finOpsCostSavedUsd: number;
}
