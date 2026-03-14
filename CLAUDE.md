# CLAUDE.md — Contexto do Projeto

## Sobre a UXIN

Empresa brasileira de soluções digitais completas (software, apps, sites, jornadas digitais, publicidade) com DNA de UX/UI. Fundada por Marcell, designer com quase 20 anos de experiência. Diferencial: UX como ponto de partida de tudo + 100% de acessibilidade em cada entrega.

## Tom de voz

- **Direto e confiante**, sem forçar proximidade artificial
- **Evitar**: "a gente", gírias, coloquialismos ("pra", "num", "sem drama", "manhas"), emojis em excesso
- **Preferir**: primeira pessoa do plural formal ("entregamos", "montamos"), construções impessoais quando natural
- Tom de quem tem 20 anos de mercado — autoridade sem arrogância

## Design system

- **Cores**: `--lime: #D2FF00` (accent), `--black: #0A0A0A` (bg), `--dark: #111` (bg alt), `--gray: #999` (texto secundário), `--gray-light: #C2C2C2` (corpo), `--white: #F0F0F0` (headings)
- **Fontes**: Outfit (display), Space Mono (labels/mono), Caveat (anotações manuscritas)
- **Tipografia**: 100% fluida com `clamp()` via custom properties (`--text-base`, `--text-lg`, `--heading-md`, etc.)
- **Spacing**: Sistema fluido (`--space-xs` a `--space-2xl`, `--edge` para padding lateral)
- **Responsivo**: Escala de 375px a 4K+ com ajuste de `font-size` base por resolução (2K: 18px, 2560+: 20px, 3200+: 22px, HiDPI aware)

## WCAG

- Contraste AA em todos os textos
- Skip-link, focus-visible, reduced-motion, touch targets 44px, forced-colors, aria-labels
- Acessibilidade é posicionamento da empresa — o site precisa ser exemplo disso

## Marcas mencionadas (como experiência, não como cases próprios)

Varejo: Renner, Riachuelo, Arezzo, Quero-Quero | Finanças: Safra, Sicredi, Mercado Bitcoin, VerdeCard, Credz | Saúde: Unimed Nacional, Hermes Pardini | Energia/Tech: Schlumberger, Equinix, Coca-Cola | Governo: SEFA PR, AGT Angola, MASFAMU | Indústria: Minerva Foods, Todeschini, Soprano, Agrofel | Viagens: ViajaNet, Turistur | Luxo: Fabrizzio Gianonne

## Países: Brasil, Angola, México, Venezuela
