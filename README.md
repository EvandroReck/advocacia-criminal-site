# AR Advocacia Criminal — Site Institucional

Site multi-página em **preto ônix** e **dourado luxo**, voltado ao setor jurídico.

## Estrutura de páginas (Front-end)

| Página | Arquivo | Conteúdo |
|--------|---------|----------|
| Home | `index.html` | Hero, diferenciais, serviços por categoria, CTAs |
| Quem Somos | `quem-somos.html` | História, valores, equipe |
| Áreas de Atuação | `areas.html` | Categorias de serviços + especialidades penais |
| Blog / Notícias | `blog.html` | Artigos jurídicos (estáticos por enquanto) |
| Contato | `contato.html` | Formulário de agendamento, canais, mapa, consulta processual |
| Admin | `admin.html` | CRUD de serviços (com categoria), agendamentos, processos |

```
/
├── index.html
├── quem-somos.html
├── areas.html
├── blog.html
├── contato.html
├── admin.html
├── css/
│   └── style.css
├── js/
│   ├── db.js          → Banco simulado (localStorage) + categorias
│   ├── main.js        → Lógica do site público
│   └── admin.js       → Lógica do painel admin
└── README.md
```

## Categorias de serviços (requisito)

1. **Consultoria e Assessoria**  
   Pareceres técnicos, orientações preventivas e análise de riscos para evitar processos judiciais.

2. **Representação Litigiosa**  
   Defesa dos interesses do cliente em ações judiciais, audiências e tribunais.

3. **Elaboração de Documentos**  
   Redação e revisão de contratos, estatutos sociais, testamentos, notificações e acordos.

Os serviços no site e no admin estão vinculados a essas categorias.

## Modelagem do banco de dados (referência SQL)

Para um backend real (MySQL/PostgreSQL), use a estrutura abaixo.

### Tabelas sugeridas

- **categorias** — as 3 categorias de serviços  
- **servicos** — serviços vinculados a uma categoria  
- **agendamentos** (ou **atendimentos**) — solicitações do formulário  
- **processos** — base da consulta processual (opcional)

### Script SQL básico

```sql
-- Categorias de serviços
CREATE TABLE categorias (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nome        VARCHAR(120) NOT NULL,
    descricao   TEXT,
    ordem       INT DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Serviços do escritório
CREATE TABLE servicos (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    titulo       VARCHAR(150) NOT NULL,
    descricao    TEXT,
    preco        VARCHAR(50),
    ativo        TINYINT(1) DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Agendamentos / atendimentos
CREATE TABLE agendamentos (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    nome         VARCHAR(150) NOT NULL,
    telefone     VARCHAR(20) NOT NULL,
    email        VARCHAR(150),
    servico      VARCHAR(150),
    data_pref    DATE,
    horario      VARCHAR(10),
    mensagem     TEXT,
    status       VARCHAR(30) DEFAULT 'Pendente',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Processos (consulta pública — opcional)
CREATE TABLE processos (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    codigo          VARCHAR(50) NOT NULL UNIQUE,
    status          VARCHAR(255),
    data_atualizacao VARCHAR(20),
    nivel_sigilo    VARCHAR(80),
    data_criacao    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed das 3 categorias
INSERT INTO categorias (nome, descricao, ordem) VALUES
('Consultoria e Assessoria', 'Pareceres técnicos, orientações preventivas e análise de riscos para evitar processos judiciais.', 1),
('Representação Litigiosa', 'Defesa dos interesses do cliente em ações judiciais, audiências e tribunais.', 2),
('Elaboração de Documentos', 'Redação e revisão de contratos, estatutos sociais, testamentos, notificações e acordos.', 3);
```

No site atual os dados ficam no **localStorage** (simulação), com a mesma lógica de categorias e serviços.

## Cores

| Token        | Hex       | Uso                       |
|--------------|-----------|---------------------------|
| Preto Ônix   | `#0A0A0A` | Fundo                     |
| Dourado Luxo | `#D4AF37` | Destaques, botões, bordas |
| Branco Off   | `#F5F5F5` | Textos principais         |

## Telefone / WhatsApp

- **+55 46 99919-3713**  
- Link: `https://wa.me/5546999193713`

## Códigos de teste da consulta

- `AR-2024-0847`  
- `AR-2025-0312`  
- `123.456.789-00`

## Como usar

1. Abra `index.html` no navegador (ou publique a pasta em GitHub Pages / Netlify / Vercel).  
2. Navegue pelas páginas: Quem Somos, Áreas, Blog, Contato.  
3. Use `admin.html` para cadastrar/editar serviços (com categoria) e ver agendamentos.  

**Nota:** Se você já tinha dados antigos no localStorage, limpe o storage do navegador (ou use aba anônima) para carregar o seed com as 3 categorias.
