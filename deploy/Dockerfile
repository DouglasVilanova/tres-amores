# Imagem de PRODUÇÃO do Três Amores Brechó Infantil (VPS da Villa: Docker + Caddy). Sem banco.
# Build (na raiz do projeto):
#   docker build -f deploy/Dockerfile --build-arg NEXT_PUBLIC_SITE_URL=https://brechotresamores.com.br -t tres-amores:<versao> .
# Só variáveis PÚBLICAS entram no build (o Next as embute no JS). Segredos só no .env da VPS, na execução.

FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-slim AS build
WORKDIR /app
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1 \
    HOSPEDAGEM=producao \
    NEXT_STANDALONE=1 \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
# Sem banco: HOSPEDAGEM=producao só marca o ambiente.
ENV NODE_ENV=production \
    HOSPEDAGEM=producao \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN groupadd --system app && useradd --system --gid app --home /app app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.status<500?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
