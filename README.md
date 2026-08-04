# AR Advocacia Criminal — Site Institucional

Site institucional minimalista em **preto ônix** e **dourado luxo**, com estrutura profissional inspirada em escritórios de alto padrão.

## Estrutura de arquivos

```
/
├── index.html          → Site público (página única)
├── admin.html          → Painel administrativo
├── css/
│   └── style.css       → Todo o design system
├── js/
│   ├── db.js           → Banco de dados simulado (localStorage)
│   ├── main.js         → Lógica do site público
│   └── admin.js        → Lógica do painel admin
└── README.md
```

## Cores

| Token        | Hex       | Uso                          |
|--------------|-----------|------------------------------|
| Preto Ônix   | `#0A0A0A` | Fundo                        |
| Dourado Luxo | `#D4AF37` | Destaques, botões, bordas    |
| Branco Off   | `#F5F5F5` | Textos principais            |

## Funcionalidades

### Site público (`index.html`)
- Menu fixo + navegação suave
- Hero com CTAs
- Áreas de atuação
- Sobre o escritório
- **Lista dinâmica de serviços** (vinda do "banco")
- **Formulário de agendamento** → grava no localStorage
- **Consulta processual** simulada
- Footer com telefone **+55 46 99919-3713** e WhatsApp

### Painel Admin (`admin.html`)
- **CRUD de serviços** (criar, editar, excluir)
- Visualização e exclusão de agendamentos
- Lista da base de processos da consulta pública

Todos os dados ficam no **localStorage** do navegador (simulação de banco de dados).

## Telefone / WhatsApp

- **+55 46 99919-3713**
- Link direto: `https://wa.me/5546999193713`

## Códigos de teste da consulta

- `AR-2024-0847`
- `AR-2025-0312`
- `123.456.789-00`

## Como usar

1. Abra `index.html` no navegador
2. Acesse `admin.html` para gerenciar serviços e ver agendamentos
3. Ou publique a pasta inteira em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel...)

## Personalização

Altere em `js/db.js` os processos e serviços iniciais, e no HTML/CSS o nome do escritório, OAB e endereço.
