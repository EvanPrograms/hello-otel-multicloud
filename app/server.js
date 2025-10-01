import express from "express";
import process from "process";

import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";

if (process.env.OTEL_DEBUG === '1') {
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)
};

const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: `${otlpEndpoint}/v1/traces` }),
  metricExporter: new OTLPMetricExporter({ url: `${otlpEndpoint}/v1/metrics` }),
  instrumentations: [getNodeAutoInstrumentations()]
});

try {
  await sdk.start();
} catch (err) {
  console.error('OTel init error', err);
}

const app = express();

app.get('/healthz', (req, res) => res.status(200).send('OK'));

app.get('/', (req, res) => res.json({ msg: 'hello-otel', time: new Date().toISOString() }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));

async function shutdown() {
  try {
    await sdk.shutdown()
  } catch (e) {
    console.error('Error shutting down OTel', e)
  } finally {
    process.exit(0)
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
