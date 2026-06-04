# CarePlus Journey 

Plataforma web de gamificação da saúde preventiva da **Care Plus** — projeto acadêmico do Challenge FIAP 2026.

> **Equipe 404 Girls Not Found**
> Giovanna Oliveira Ferreira Dias (RM 566647) · Maria Laura Pereira Druzeic (RM 566634) · Marianne Mukai Nishikawa (RM 568001)

---

##  Sobre o projeto

Aplicação web responsiva construída em **React + Vite**, que transforma hábitos de saúde preventiva (caminhadas, hidratação, sono, atividade física) em uma jornada gamificada com missões, pontos, badges, ranking opt-in e a evolução da mascote **Flora**.

Esta entrega cobre as duas disciplinas web do Challenge: **Web Development** e **Front-End Design (MVP Final)**.

---

##  Estrutura do repositório

```
careplus-journey/
├── INTEGRANTES.TXT
├── README.md                  ← este arquivo
├── index.html                 ← HTML raiz (Vite)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                ← rewrites para SPA (deploy Vercel)
│
├── public/
│   └── api/                   ← API JSON local (servida pelo Vite)
│       ├── journeys.json
│       ├── rewards.json
│       ├── badges.json
│       ├── leaderboard.json
│       └── integrations.json
│
└── src/
    ├── main.jsx               ← entry point
    ├── App.jsx                ← rotas (React Router)
    ├── styles.css             ← Tailwind + tema CarePlus
    ├── services/
    │   └── api.js             ← camada de consumo de API (fetch + tratamento de erro)
    ├── hooks/
    │   ├── useApiResource.js  ← hook customizado (loading / error / data)
    │   └── useLocalStorage.js
    ├── context/
    │   └── AppContext.jsx     ← estado global (Context API)
    ├── components/            ← Header, Sidebar, Footer, Layout, Toast, etc.
    ├── pages/                 ← Home, Login, Journeys, Missions, Rewards, Ranking…
    └── data/
        └── data.js
```

---

##  Cobertura das disciplinas

###  Web Development — *Construindo Aplicações React Dinâmicas*

| Exigência da disciplina | Onde está implementada |
|---|---|
| **Consumo de API (JSON Local)** | `public/api/*.json` servidos pelo Vite + `src/services/api.js` com `fetch` e tratamento de erros HTTP |
| **Manipulação do DOM e Eventos** | `onClick`, `onChange`, `onSubmit` nas páginas + estados controlados com `useState` |
| **Estilização com Tailwind CSS** | `tailwind.config.js` com tema CarePlus + `src/styles.css` aplicando utilitários no projeto |
| **Orientação pela Documentação React** | Hooks (`useState`, `useEffect`, `useCallback`, `useRef`, `useMemo`), componentes funcionais, props, Context API |
| **Conformidade com Padrões W3C** | HTML semântico (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`), atributos `aria-*`, `role`, contraste WCAG AA |
| **Autenticidade e Originalidade** | Mascote "Flora", jornadas temáticas próprias, design system CarePlus |
| **Versionamento com GitHub** | `.gitignore` configurado, estrutura limpa para `git init` + push |

###  Front-End Design — *MVP Final*

| Exigência da disciplina | Onde está implementada |
|---|---|
| **Elementos Interativos** | Formulários, modais, dropdowns e componentes interativos nas páginas |
| **CSS Grid Layout** | Layout estruturado com Grid (combinado a utilitários Tailwind) |
| **Tailwind CSS** | Estilização moderna e responsiva em todo o projeto |
| **Responsividade Completa** | Adaptação para Desktop, Tablet e Mobile |
| **Deploy com Git + Vercel** | `vercel.json` com rewrites de SPA; build do Vite pronto para publicação |

---

##  Como executar

```bash
npm install
npm run dev          # roda em http://localhost:5173
# ou
npm run build        # gera dist/ pronto para deploy na Vercel
npm run preview      # pré-visualiza o build de produção
```

> Requer **Node.js 18+**.

**Credenciais de teste:** usuário `ana.martins` · senha `123456`

---

##  Deploy (Vercel)

1. Faça push do repositório para o GitHub.
2. Importe o repositório na Vercel.
3. Framework preset: **Vite** · Build command: `npm run build` · Output: `dist`.
4. O `vercel.json` já cuida do roteamento de SPA (todas as rotas caem em `index.html`).

---

##  Licença

Projeto acadêmico — FIAP, Challenge Care Plus 2026.
