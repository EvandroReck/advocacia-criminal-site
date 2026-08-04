/**
 * Banco de dados simulado com localStorage
 * AR Advocacia Criminal
 */

const DB = {
    KEYS: {
        SERVICOS: 'ar_servicos',
        AGENDAMENTOS: 'ar_agendamentos',
        PROCESSOS: 'ar_processos'
    },

    // -------- SERVIÇOS --------
    getServicos() {
        const data = localStorage.getItem(this.KEYS.SERVICOS);
        if (data) return JSON.parse(data);
        // Seed inicial
        const seed = [
            {
                id: 's1',
                titulo: 'Consulta Inicial',
                descricao: 'Análise preliminar do caso, orientação jurídica e definição de estratégia.',
                preco: 'Sob consulta',
                criadoEm: new Date().toISOString()
            },
            {
                id: 's2',
                titulo: 'Habeas Corpus',
                descricao: 'Impetração de HC preventivo ou liberatório com caráter de urgência.',
                preco: 'Sob consulta',
                criadoEm: new Date().toISOString()
            },
            {
                id: 's3',
                titulo: 'Acompanhamento de Inquérito',
                descricao: 'Defesa na fase policial, acompanhamento de diligências e operações.',
                preco: 'Sob consulta',
                criadoEm: new Date().toISOString()
            },
            {
                id: 's4',
                titulo: 'Defesa em Tribunal do Júri',
                descricao: 'Preparação completa e atuação em plenário do Tribunal do Júri.',
                preco: 'Sob consulta',
                criadoEm: new Date().toISOString()
            },
            {
                id: 's5',
                titulo: 'Execução Penal',
                descricao: 'Progressão de regime, livramento condicional, indulto e comutação.',
                preco: 'Sob consulta',
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

        // tenta CPF só números
        const digits = key.replace(/\D/g, '');
        if (digits.length === 11 && processos[digits]) return processos[digits];

        return null;
    }
};
