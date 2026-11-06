# RibeiroLab — Design

## Para quem e para quê

- **Quem é**: estúdio de uma pessoa (Lucas Ribeiro), em São Paulo, que faz sites e sistemas para pequenos negócios: lojas, restaurantes, salões, consultórios.
- **Quem visita**: donos de pequenos negócios, sem perfil técnico, que decidem pelo WhatsApp.
- **Trabalho da página**: mostrar trabalho real e levar a pessoa a pedir orçamento no WhatsApp.

## Direção

Placa de rua paulistana e vitrine de loja. Fundo claro e limpo, tinta azul-marinho e o azul das placas de rua de São Paulo como única cor de destaque. O elemento memorável é a **vitrine no topo**: sites reais de clientes (Nativa's Mel e Nina Store) em moldura de navegador e celular. Todo o resto é quieto.

Fala em primeira pessoa ("eu"): o diferencial é falar direto com quem faz.

## Cores

| Token | Hex | Uso |
|---|---|---|
| `papel` | `#F6F7F9` | fundo das seções alternadas |
| `branco` | `#FFFFFF` | fundo principal, cartões |
| `tinta` | `#1B2440` | texto e títulos |
| `grafite` | `#545D72` | texto secundário (contraste 6,4:1 no papel) |
| `placa` | `#1F4FD1` | botões, links, seção de contato |
| `placa-escura` | `#173CA3` | hover dos botões |
| `linha` | `#D9DEE7` | bordas e divisórias |
| `sinal` | `#F2B705` | só no anel de foco do teclado |

O verde do WhatsApp aparece só no botão flutuante do WhatsApp.

## Tipografia

- **Archivo** (variável, auto-hospedada): a mesma família em tudo.
- Títulos: peso 800, largura 112 (expandida, lembra letreiro), espaçamento -0.01em.
- Texto: peso 400, largura 100, 17–18 px, altura de linha 1.6, até ~70 caracteres por linha.
- Escala: 56/40/28/20/17/14 px no desktop.
- Sem caixa-alta em rótulos, sem palavra destacada em cor dentro do título.

## Layout

- Conteúdo alinhado à esquerda, largura máxima 1180 px.
- Seções alternam `branco` e `papel`; o contato é um bloco `placa` com texto branco.
- Raio: 10 px em molduras e botões, 6 px em campos. Sombra só nas molduras da vitrine.
- Numeração apenas no "Como funciona" (é uma sequência real).

## O que não usar

Degradês roxo/azul, efeito de vidro, foguetes e estrelas flutuando, brilho seguindo o mouse, granulado, selos em pílula com bolinha, rótulos em caixa-alta acima dos títulos, setas no fim dos botões, cartões idênticos repetidos, animação de entrada em cada seção.
