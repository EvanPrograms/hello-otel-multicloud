// app/tracing.js
import process from "process";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";

if (process.env.OTEL_DEBUG === '1') {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
}

const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: `${otlpEndpoint}/v1/traces` }),
  metricExporter: new OTLPMetricExporter({ url: `${otlpEndpoint}/v1/metrics` }),
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  await sdk.start();
} catch (err) {
  console.error('OTel init error', err);
}

// graceful shutdown if the process exits
async function shutdown() {
  try { await sdk.shutdown(); } catch (e) { console.error('Error shutting down OTel', e); }
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
