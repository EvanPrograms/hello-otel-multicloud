FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
ENV NODE_ENV=production
ENV OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318

CMD ["npm", "start"]

