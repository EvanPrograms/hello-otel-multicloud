import './tracing.js';
import express from "express";
import { metrics } from "@opentelemetry/api"; 

const app = express();

const meter = metrics.getMeter('hello-otel');
const reqCounter = meter.createCounter('hello_requests_total', {
  description: 'Total HTTP requests served by hello-otel',
});

app.use((req, res, next) => {
  res.on('finish', () => {
    try {
      reqCounter.add(1, {
        route: req.path || '/',
        method: req.method,
        status_code: String(res.statusCode),
      });
    } catch (_) {}
  });
  next();
});

app.get('/healthz', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => res.json({ msg: 'hello-otel', time: new Date().toISOString() }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
