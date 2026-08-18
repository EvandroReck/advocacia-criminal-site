/**
 * Banco de dados simulado com localStorage
 * AR Advocacia Criminal
 *
 * Modelagem alinhada com as categorias:
 * 1. Consultoria e Assessoria
 * 2. Representação Litigiosa
 * 3. Elaboração de Documentos
 */

const DB = {
    KEYS: {
        CATEGORIAS: 'ar_categorias',
        SERVICOS: 'ar_servicos',
        AGENDAMENTOS: 'ar_agendamentos',
        PROCESSOS: 'ar_processos'
    },

    // -------- CATEGORIAS --------
    getCategorias() {
        const data = localStorage.getItem(this.KEYS.CATEGORIAS);
        if (data) return JSON.parse(data);

        const seed = [
            {
                id: 'cat1',
                nome: 'Consultoria e Assessoria',
                descricao: 'Pareceres técnicos, orientações preventivas e análise de riscos para evitar processos judiciais.',
                ordem: 1,
                criadoEm: new Date().toISOString()
            },
            {
                id: 'cat2',
                nome: 'Representação Litigiosa',
                descricao: 'Defesa dos interesses do cliente em ações judiciais, audiências e tribunais.',
                ordem: 2,
                criadoEm: new Date().toISOString()
            },
            {
                id: 'cat3',
                nome: 'Elaboração de Documentos',
                descricao: 'Redação e revisão de contratos, estatutos sociais, testamentos, notificações e acordos.',
                ordem: 3,
                criadoEm: new Date().toISOString()
            }
        ];
        this.saveCategorias(seed);
        return seed;
    },

    saveCategorias(list) {
        localStorage.setItem(this.KEYS.CATEGORIAS, JSON.stringify(list));
    },

    // -------- SERVIÇOS --------
    getServicos() {
        const data = localStorage.getItem(this.KEYS.SERVICOS);
        if (data) return JSON.parse(data);

        const seed = [
            {
                id: 's1',
                categoriaId: 'cat1',
                titulo: 'Consulta Inicial',
                descricao: 'Análise preliminar do caso, orientação jurídica e definição de estratégia preventiva.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 's2',
                categoriaId: 'cat1',
                titulo: 'Parecer Técnico',
                descricao: 'Pareceres técnicos e análise de riscos para evitar processos judiciais.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 's3',
                categoriaId: 'cat2',
                titulo: 'Habeas Corpus',
                descricao: 'Impetração de HC preventivo ou liberatório com caráter de urgência.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 's4',
                categoriaId: 'cat2',
                titulo: 'Defesa em Tribunal do Júri',
                descricao: 'Preparação completa e atuação em plenário do Tribunal do Júri.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 's5',
                categoriaId: 'cat2',
                titulo: 'Acompanhamento de Inquérito',
                descricao: 'Defesa na fase policial, acompanhamento de diligências e operações.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 's6',
                categoriaId: 'cat2',
                titulo: 'Execução Penal',
                descricao: 'Progressão de regime, livramento condicional, indulto e comutação.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 's7',
                categoriaId: 'cat3',
                titulo: 'Elaboração de Contratos',
                descricao: 'Redação e revisão de contratos, acordos e notificações extrajudiciais.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            },
            {
                id: 's8',
                categoriaId: 'cat3',
                titulo: 'Documentos Diversos',
                descricao: 'Estatutos, testamentos, procurações e demais instrumentos jurídicos.',
                preco: 'Sob consulta',
                ativo: true,
                criadoEm: new Date().toISOString()
            }
        ];
        this.saveServicos(seed);
        return seed;
    },

    saveServicos(list) {
        localStorage.setItem(this.KEYS.SERVICOS, JSON.stringify(list));
    },

    addServico(servico) {
        const list = this.getServicos();
        servico.id = 's' + Date.now();
        servico.criadoEm = new Date().toISOString();
        servico.ativo = servico.ativo !== false;
        list.push(servico);
        this.saveServicos(list);
        return servico;
    },

    updateServico(id, dados) {
        const list = this.getServicos();
        const idx = list.findIndex(s => s.id === id);
        if (idx === -1) return null;
        list[idx] = { ...list[idx], ...dados };
        this.saveServicos(list);
        return list[idx];
    },

    deleteServico(id) {
        let list = this.getServicos();
        list = list.filter(s => s.id !== id);
        this.saveServicos(list);
    },

    getServicosPorCategoria(categoriaId) {
        return this.getServicos().filter(s => s.categoriaId === categoriaId && s.ativo !== false);
    },

    // -------- AGENDAMENTOS --------
    getAgendamentos() {
        const data = localStorage.getItem(this.KEYS.AGENDAMENTOS);
        return data ? JSON.parse(data) : [];
    },

    saveAgendamentos(list) {
        localStorage.setItem(this.KEYS.AGENDAMENTOS, JSON.stringify(list));
    },

    addAgendamento(ag) {
        const list = this.getAgendamentos();
        ag.id = 'a' + Date.now();
        ag.criadoEm = new Date().toISOString();
        ag.status = 'Pendente';
        list.unshift(ag);
        this.saveAgendamentos(list);
        return ag;
    },

    deleteAgendamento(id) {
        let list = this.getAgendamentos();
        list = list.filter(a => a.id !== id);
        this.saveAgendamentos(list);
    },

    clearAgendamentos() {
        localStorage.removeItem(this.KEYS.AGENDAMENTOS);
    },

    // -------- PROCESSOS (consulta pública) --------
    getProcessos() {
        const data = localStorage.getItem(this.KEYS.PROCESSOS);
        if (data) return JSON.parse(data);

        const seed = {
            'AR-2024-0847': {
                status: 'Petição protocolada — Aguardando decisão monocrática',
                data: '28/07/2026',
                sigilo: 'Nível 3 — Sigilo de Justiça'
            },
            'AR-2025-0312': {
                status: 'Audiência de instrução designada',
                data: '02/08/2026',
                sigilo: 'Nível 2 — Restrito às partes'
            },
            '123.456.789-00': {
                status: 'Habeas Corpus deferido — Liberdade provisória concedida',
                data: '30/07/2026',
                sigilo: 'Nível 3 — Sigilo de Justiça'
            },
            '12345678900': {
                status: 'Habeas Corpus deferido — Liberdade provisória concedida',
                data: '30/07/2026',
                sigilo: 'Nível 3 — Sigilo de Justiça'
            }
        };
        localStorage.setItem(this.KEYS.PROCESSOS, JSON.stringify(seed));
        return seed;
    },

    buscarProcesso(codigo) {
        const processos = this.getProcessos();
        const key = codigo.trim().toUpperCase().replace(/\s/g, '');
        if (processos[key]) return processos[key];

        const digits = key.replace(/\D/g, '');
        if (digits.length === 11 && processos[digits]) return processos[digits];

        return null;
    }
};
