# Três Amores Brechó Infantil — landing page

Site do Três Amores, brechó infantil em Passo Fundo/RS.

Next.js 16 + Tailwind CSS 4. Sem banco de dados: o conteúdo fica em `lib/defaults.ts`.

## Rodar

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Ver `.env.example`. O chatbot (`/api/chat`) precisa de `ANTHROPIC_API_KEY`; sem ela, o
widget leva a pessoa para o WhatsApp.

## Publicar

Deploy na Vercel. Enquanto `site.json` estiver com `status: "desenvolvimento"`, o site não é
indexado. Para publicar no domínio final, trocar para `"online"`.
