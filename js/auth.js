/**
 * Autenticação simples do Painel Admin (client-side)
 * Credenciais válidas apenas para o proprietário.
 */

const Auth = {
    SESSION_KEY: 'ar_admin_session',

    // Único usuário autorizado
    VALID_EMAIL: 'evandro.reckziegel.gallett@gmail.com',
    VALID_PASSWORD: 'senha',

    login(email, password) {
        const emailNorm = (email || '').trim().toLowerCase();
        const pass = password || '';

        if (emailNorm === this.VALID_EMAIL.toLowerCase() && pass === this.VALID_PASSWORD) {
            const session = {
                email: this.VALID_EMAIL,
                loggedAt: new Date().toISOString()
            };
            localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
            return { ok: true };
        }

        return {
            ok: false,
            message: 'E-mail ou senha incorretos. Acesso restrito.'
        };
    },

    logout() {
        localStorage.removeItem(this.SESSION_KEY);
    },

    isLoggedIn() {
        try {
            const raw = localStorage.getItem(this.SESSION_KEY);
            if (!raw) return false;
            const session = JSON.parse(raw);
            return !!(session && session.email === this.VALID_EMAIL);
        } catch {
            return false;
        }
    },

    getSession() {
        try {
            const raw = localStorage.getItem(this.SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    /** Redireciona para login se não estiver autenticado */
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};
