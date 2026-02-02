/**
 * REGISTRO DO SERVICE WORKER
 * 
 * Registra o Service Worker no navegador.
 * Deve ser importado no main.jsx
 */

export function registerServiceWorker() {
    // Verifica se o navegador suporta Service Workers
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    if (import.meta.env.DEV) {
                        console.log('✅ Service Worker registrado com sucesso:', registration.scope);
                    }

                    // Verifica atualizações a cada 1 hora
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000);

                    // Listener para quando houver atualização
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;

                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // Nova versão disponível
                                if (import.meta.env.DEV) {
                                    console.log('🔄 Nova versão disponível! Recarregue a página.');
                                }

                                // Opcional: Mostrar notificação ao usuário
                                if (confirm('Nova versão disponível! Deseja atualizar agora?')) {
                                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                                    window.location.reload();
                                }
                            }
                        });
                    });
                })
                .catch((error) => {
                    if (import.meta.env.DEV) {
                        console.error('❌ Erro ao registrar Service Worker:', error);
                    }
                });

            // Listener para quando o Service Worker tomar controle
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (import.meta.env.DEV) {
                    console.log('🔄 Service Worker atualizado, recarregando...');
                }
                window.location.reload();
            });
        });
    } else {
        if (import.meta.env.DEV) {
            console.warn('⚠️ Service Workers não são suportados neste navegador');
        }
    }
}

// Função para desregistrar (útil para desenvolvimento)
export function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
                if (import.meta.env.DEV) {
                    console.log('Service Worker desregistrado');
                }
            })
            .catch((error) => {
                if (import.meta.env.DEV) {
                    console.error('Erro ao desregistrar Service Worker:', error);
                }
            });
    }
}