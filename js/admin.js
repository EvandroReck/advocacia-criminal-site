/**
 * Admin panel — com suporte a categorias
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    populateCategoriaSelect();
    renderServicosAdmin();
    renderAgendamentos();
    renderProcessos();
    initFormServico();
    initLimparAgendamentos();
});

function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        });
    });
}

function populateCategoriaSelect() {
    const select = document.getElementById('servico-categoria');
    if (!select) return;

    const categorias = DB.getCategorias().sort((a, b) => a.ordem - b.ordem);
    categorias.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.nome;
        select.appendChild(opt);
    });
}

function renderServicosAdmin() {
    const container = document.getElementById('lista-servicos-admin');
    if (!container) return;

    const list = DB.getServicos();
    const categorias = DB.getCategorias();

    if (!list.length) {
        container.innerHTML = '<p class="empty-state">Nenhum serviço cadastrado.</p>';
        return;
    }

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${list.map(s => {
                    const cat = categorias.find(c => c.id === s.categoriaId);
                    return `
                    <tr>
                        <td>${escapeHtml(s.titulo)}</td>
                        <td>${escapeHtml(cat ? cat.nome : '—')}</td>
                        <td>${escapeHtml((s.descricao || '').substring(0, 50))}${(s.descricao || '').length > 50 ? '...' : ''}</td>
                        <td>${escapeHtml(s.preco || '—')}</td>
                        <td>${s.ativo !== false ? 'Ativo' : 'Inativo'}</td>
                        <td class="actions-cell">
                            <button class="btn-icon" onclick="editarServico('${s.id}')">Editar</button>
                            <button class="btn-icon danger" onclick="excluirServico('${s.id}')">Excluir</button>
                        </td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
}

function initFormServico() {
    const form = document.getElementById('form-servico');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById('servico-id').value;
        const dados = {
            titulo: document.getElementById('servico-titulo').value.trim(),
            descricao: document.getElementById('servico-descricao').value.trim(),
            preco: document.getElementById('servico-preco').value.trim(),
            categoriaId: document.getElementById('servico-categoria').value,
            ativo: document.getElementById('servico-ativo').value === 'true'
        };

        if (id) {
            DB.updateServico(id, dados);
        } else {
            DB.addServico(dados);
        }

        form.reset();
        document.getElementById('servico-id').value = '';
        document.getElementById('btn-cancelar-servico').style.display = 'none';
        document.getElementById('btn-salvar-servico').textContent = 'Salvar Serviço';
        renderServicosAdmin();
    });

    document.getElementById('btn-cancelar-servico').addEventListener('click', () => {
        form.reset();
        document.getElementById('servico-id').value = '';
        document.getElementById('btn-cancelar-servico').style.display = 'none';
        document.getElementById('btn-salvar-servico').textContent = 'Salvar Serviço';
    });
}

function editarServico(id) {
    const list = DB.getServicos();
    const s = list.find(x => x.id === id);
    if (!s) return;

    document.getElementById('servico-id').value = s.id;
    document.getElementById('servico-titulo').value = s.titulo;
    document.getElementById('servico-descricao').value = s.descricao;
    document.getElementById('servico-preco').value = s.preco || '';
    document.getElementById('servico-categoria').value = s.categoriaId || '';
    document.getElementById('servico-ativo').value = s.ativo !== false ? 'true' : 'false';
    document.getElementById('btn-salvar-servico').textContent = 'Atualizar Serviço';
    document.getElementById('btn-cancelar-servico').style.display = 'inline-flex';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function excluirServico(id) {
    if (!confirm('Excluir este serviço?')) return;
    DB.deleteServico(id);
    renderServicosAdmin();
}

function renderAgendamentos() {
    const container = document.getElementById('lista-agendamentos');
    if (!container) return;

    const list = DB.getAgendamentos();

    if (!list.length) {
        container.innerHTML = '<p class="empty-state">Nenhum agendamento registrado ainda.</p>';
        return;
    }

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Serviço</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${list.map(a => `
                    <tr>
                        <td>${escapeHtml(a.nome)}</td>
                        <td><a href="https://wa.me/55${(a.telefone || '').replace(/\D/g, '')}" target="_blank" rel="noopener">${escapeHtml(a.telefone)}</a></td>
                        <td>${escapeHtml(a.servico)}</td>
                        <td>${formatDate(a.data)}</td>
                        <td>${escapeHtml(a.horario)}</td>
                        <td>${escapeHtml(a.status)}</td>
                        <td class="actions-cell">
                            <button class="btn-icon danger" onclick="excluirAgendamento('${a.id}')">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function excluirAgendamento(id) {
    if (!confirm('Remover este agendamento?')) return;
    DB.deleteAgendamento(id);
    renderAgendamentos();
}

function initLimparAgendamentos() {
    const btn = document.getElementById('btn-limpar-agendamentos');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (!confirm('Limpar TODOS os agendamentos?')) return;
        DB.clearAgendamentos();
        renderAgendamentos();
    });
}

function renderProcessos() {
    const container = document.getElementById('lista-processos');
    if (!container) return;

    const processos = DB.getProcessos();
    const entries = Object.entries(processos).filter(([k]) => !/^\d{11}$/.test(k));

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Código / CPF</th>
                    <th>Status</th>
                    <th>Atualização</th>
                    <th>Sigilo</th>
                </tr>
            </thead>
            <tbody>
                ${entries.map(([codigo, p]) => `
                    <tr>
                        <td>${escapeHtml(codigo)}</td>
                        <td>${escapeHtml(p.status)}</td>
                        <td>${escapeHtml(p.data)}</td>
                        <td>${escapeHtml(p.sigilo)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}
