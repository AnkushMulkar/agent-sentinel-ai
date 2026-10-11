/**
 * AgentSentinel - OpenTelemetry Trace & Guardrail Backend API Server
 * Run with: node server.js
 */

import http from 'node:http';

const PORT = process.env.PORT || 4002;

const mockTraces = [
  {
    id: 'tr-901',
    agentName: 'CustomerSupportAutoResolver',
    status: 'SUCCESS',
    durationMs: 720,
    modelUsed: 'gemini-1.5-pro',
    tokenUsage: { totalTokens: 1620, costUsd: 0.0048 },
  },
  {
    id: 'tr-902',
    agentName: 'SecOpsVulnerabilityAnalyzer',
    status: 'GUARDRAIL_BLOCKED',
    durationMs: 410,
    modelUsed: 'claude-3-5-sonnet',
    tokenUsage: { totalTokens: 2270, costUsd: 0.0089 },
  },
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'HEALTHY', service: 'AgentSentinel Tracing Collector API', timestamp: new Date() }));
    return;
  }

  if (req.url === '/api/v1/traces' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, traces: mockTraces }));
    return;
  }

  if (req.url === '/api/v1/security/redact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const parsed = JSON.parse(body || '{}');
      const rawText = parsed.text || '';
      const sanitized = rawText
        .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]')
        .replace(/\bsk_live_[a-zA-Z0-9]+\b/g, '[REDACTED_API_KEY]');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        sanitizedText: sanitized,
        piiCount: (rawText.match(/\b\d{3}-\d{2}-\d{4}\b/g) || []).length,
      }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`[AgentSentinel Ingestion API] Listening on http://localhost:${PORT}`);
});
