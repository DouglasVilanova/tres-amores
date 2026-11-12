# Três Amores Brechó Infantil — landing page

Site do Três Amores, brechó infantil em Passo Fundo/RS.

Next.js 16 + Tailwind CSS 4. Sem banco de dados: o conteúdo fica em `lib/defaults.ts`.

## Rodar

```bash
npm install
npm run dev
```

## Atendimento

O botão "Tirar uma dúvida" é um menu de perguntas com respostas prontas, montadas a partir do
conteúdo do site (`lib/chat-topicos.ts`). Sem IA e sem chave de API; o resto vai para o WhatsApp.

## Publicar

Docker na VPS (`deploy/`). Enquanto `site.json` estiver com `status: "desenvolvimento"`, o site não é
indexado. Para publicar no domínio final, trocar para `"online"`.
