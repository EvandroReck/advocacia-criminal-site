/**
 * Main — Site público
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    renderServicos();
    populateServicoSelect();
    initFormAgendar();
    initFormConsulta();
});

// Menu mobile
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
    });
}

// Lista de serviços na home
function renderServicos() {
    const container = document.getElementById('servicos-list');
    if (!container) return;

    const servicos = DB.getServicos();

    if (!servicos.length) {
        container.innerHTML = '<p class="empty-state">Nenhum serviço cadastrado no momento.</p>';
        return;
    }

    container.innerHTML = servicos.map(s => `
        <article class="card">
            <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <h3>${escapeHtml(s.titulo)}</h3>
            <p>${escapeHtml(s.descricao)}</p>
            ${s.preco ? `<p style="margin-top:0.75rem;color:var(--gold);font-size:0.8rem;">${escapeHtml(s.preco)}</p>` : ''}
        </article>
    `).join('');
}

// Select do formulário de agendamento
function populateServicoSelect() {
    const select = document.getElementById('servico');
    if (!select) return;

    const servicos = DB.getServicos();
    servicos.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.titulo;
        opt.textContent = s.titulo;
        select.appendChild(opt);
    });
}

// Formulário de agendamento
function initFormAgendar() {
    const form = document.getElementById('form-agendar');
    if (!form) return;

    // data mínima = hoje
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const today = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', today);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('btn-agendar');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        const sucesso = document.getElementById('agendar-sucesso');
        const erro = document.getElementById('agendar-erro');

        sucesso.classList.add('hidden');
        erro.classList.add('hidden');
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        btn.disabled = true;

        await delay(900);

        try {
            const ag = {
                nome: form.nome.value.trim(),
                telefone: form.telefone.value.trim(),
                email: form.email.value.trim(),
                servico: form.servico.value,
                data: form.data.value,
                horario: form.horario.value,
                mensagem: form.mensagem.value.trim()
            };

            DB.addAgendamento(ag);

            sucesso.textContent = `Agendamento confirmado para ${formatDate(ag.data)} às ${ag.horario}. Entraremos em contato pelo WhatsApp.`;
            sucesso.classList.remove('hidden');
            form.reset();
        } catch (err) {
            erro.textContent = 'Erro ao registrar agendamento. Tente novamente.';
            erro.classList.remove('hidden');
        }

        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        btn.disabled = false;
    });
}

// Consulta processual
function initFormConsulta() {
    const form = document.getElementById('form-consulta');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const codigo = document.getElementById('codigo').value;
        const btn = document.getElementById('btn-consultar');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        const resultado = document.getElementById('resultado-consulta');
        const erro = document.getElementById('erro-consulta');

        resultado.classList.add('hidden');
        erro.classList.add('hidden');
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');

        await delay(1100);

        const processo = DB.buscarProcesso(codigo);

        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');

        if (processo) {
            document.getElementById('status-texto').textContent = processo.status;
            document.getElementById('codigo-resultado').textContent = codigo.trim();
            document.getElementById('data-resultado').textContent = processo.data;
            document.getElementById('sigilo-resultado').textContent = processo.sigilo;
            resultado.classList.remove('hidden');
        } else {
            erro.classList.remove('hidden');
        }
    });
}

// Utils
function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
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
