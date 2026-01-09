/**
 * SERVICE WORKER
 * 
 * Script que roda em background para:
 * - Cache de recursos (offline)
 * - Performance melhorada
 * - PWA funcional
 */

const CACHE_NAME = 'miguelxavier-v1.0.0';
const RUNTIME_CACHE = 'miguelxavier-runtime';

// Arquivos essenciais para cachear na instalação
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
];

// Instalar Service Worker e cachear recursos essenciais
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Instalando...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Cacheando recursos essenciais');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                console.log('[Service Worker] Instalado com sucesso');
                // Força o SW a ativar imediatamente
                return self.skipWaiting();
            })
    );
});

// Ativar Service Worker e limpar caches antigos
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Ativando...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Remove caches antigos
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('[Service Worker] Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Ativado com sucesso');
                // Toma controle de todas as páginas imediatamente
                return self.clients.claim();
            })
    );
});

// Interceptar requisições e servir do cache quando possível
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignora requisições de outras origens (APIs externas, etc)
    if (url.origin !== location.origin) {
        return;
    }

    // Estratégia: Cache First, falling back to Network
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('[Service Worker] Servindo do cache:', request.url);
                    return cachedResponse;
                }

                // Se não está no cache, busca da rede
                console.log('[Service Worker] Buscando da rede:', request.url);
                return fetch(request)
                    .then((response) => {
                        // Não cachear respostas inválidas
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clona a resposta (streams só podem ser lidos uma vez)
                        const responseToCache = response.clone();

                        // Cachear recursos estáticos (CSS, JS, imagens, fontes)
                        if (
                            request.method === 'GET' &&
                            (
                                request.url.match(/\.(css|js|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/i) ||
                                request.url.includes('/src/')
                            )
                        ) {
                            caches.open(RUNTIME_CACHE)
                                .then((cache) => {
                                    console.log('[Service Worker] Cacheando:', request.url);
                                    cache.put(request, responseToCache);
                                });
                        }

                        return response;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Erro ao buscar:', request.url, error);

                        // Se falhar e for uma navegação, retorna página offline
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }

                        throw error;
                    });
            })
    );
});

// Mensagens do cliente (opcional - para comunicação com a página)
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('[Service Worker] Carregado');
