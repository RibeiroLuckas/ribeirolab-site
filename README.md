# RibeiroLab

Site da RibeiroLab — https://www.ribeirolab.dev.br/

Feito com React, Vite, TypeScript e Tailwind CSS. Publicado na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar

Cada push na branch `main` gera um novo deploy na Vercel.

## Google Ads

A medição de conversões já está configurada em `src/lib/analytics.ts`
(conta AW-18553897997: "Clique no WhatsApp" e "Enviar formulário de lead").
A tag só carrega depois que o visitante aceita os cookies.
Para trocar os códigos sem mexer no código, use as variáveis do `.env.example`.
