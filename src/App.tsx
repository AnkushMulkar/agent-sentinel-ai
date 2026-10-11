import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { TelemetryMetrics } from './components/TelemetryMetrics';
import { LiveTraceInspector } from './components/LiveTraceInspector';
import { EvalSuiteBenchmark } from './components/EvalSuiteBenchmark';
import { FinOpsCostEngine } from './components/FinOpsCostEngine';
import { SecurityComplianceSandbox } from './components/SecurityComplianceSandbox';
import { ArchitectureDocsModal } from './components/ArchitectureDocsModal';
import { Footer } from './components/Footer';
import {
  mockAgentTraces,
  initialPlatformMetrics,
  mockEvalBenchmarks,
  mockFinOpsBudgetRules,
  mockSecurityEvents,
} from './data/mockData';
import type { AgentTrace } from './types/sentinel';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [traces, setTraces] = useState<AgentTrace[]>(mockAgentTraces);
  const [metrics] = useState(initialPlatformMetrics);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  const handleAddTrace = (newTrace: AgentTrace) => {
    setTraces([newTrace, ...traces]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Platform Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDocs={() => setIsDocsOpen(true)}
      />

      {/* Main Workspace */}
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '1rem 2rem 3rem 2rem' }}>
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreWorkspace={() => setActiveTab('traces')}
              onOpenDocs={() => setIsDocsOpen(true)}
            />

            <FeatureShowcase />

            <div style={{ paddingTop: '3rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#f8fafc' }}>
                  Live OpenTelemetry Agent Observability Workspace
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', fontWeight: 400 }}>
                  Real-time trace stream, security guardrail interception, and token cost analytics.
                </p>
              </div>

              <TelemetryMetrics metrics={metrics} />
              <LiveTraceInspector
                traces={traces}
                onAddTrace={handleAddTrace}
                searchTerm=""
              />
            </div>
          </>
        )}

        {activeTab === 'traces' && (
          <>
            <TelemetryMetrics metrics={metrics} />
            <LiveTraceInspector
              traces={traces}
              onAddTrace={handleAddTrace}
              searchTerm=""
            />
          </>
        )}

        {activeTab === 'evals' && (
          <EvalSuiteBenchmark benchmarks={mockEvalBenchmarks} />
        )}

        {activeTab === 'finops' && (
          <FinOpsCostEngine budgetRules={mockFinOpsBudgetRules} />
        )}

        {activeTab === 'security' && (
          <SecurityComplianceSandbox events={mockSecurityEvents} />
        )}
      </main>

      <Footer
        onOpenDocs={() => setIsDocsOpen(true)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Architecture Spec Modal */}
      <ArchitectureDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}

export default App;
