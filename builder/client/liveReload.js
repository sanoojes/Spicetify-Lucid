(() => {
  const RELOAD_EVENTS = {
    CSS: 'reload_css',
    FULL: 'reload',
  };
  const WS_URL = 'ws://localhost:5000';
  const CSS_SELECTOR = "link.userCSS[href*='user.css']";
  const RECONNECT_BASE_DELAY = 1000; // in ms

  let socket;
  let reconnectAttempts = 0;

  const log = (...args) => console.log('[LiveReload]', ...args);
  const warn = (...args) => console.warn('[LiveReload]', ...args);
  const error = (...args) => console.error('[LiveReload]', ...args);

  function getLinkElem() {
    return document.querySelector(CSS_SELECTOR);
  }

  function reloadCSS() {
    const link = getLinkElem();
    if (!link) {
      warn('CSS link element not found. Reloading full page...');
      location.reload();
      return;
    }
    const baseHref = link.href.split('?')[0];
    link.href = `${baseHref}?t=${Date.now()}`;
    log('CSS reloaded.');
  }

  function connect() {
    socket = new WebSocket(WS_URL);

    socket.addEventListener('open', () => {
      log('Connected');
      reconnectAttempts = 0;
    });

    socket.addEventListener('message', (e) => {
      if (e.data === RELOAD_EVENTS.CSS) {
        reloadCSS();
      } else if (e.data === RELOAD_EVENTS.FULL) {
        log('Reloading full page...');
        location.reload();
      } else {
        log('Unknown message:', e.data);
      }
    });

    socket.addEventListener('close', () => {
      log('Disconnected');
      scheduleReconnect();
    });

    socket.addEventListener('error', (err) => {
      error('WebSocket error:', err);
    });
  }

  function scheduleReconnect() {
    const delay = Math.min(RECONNECT_BASE_DELAY * 2 ** reconnectAttempts, 30000);
    reconnectAttempts++;
    log(`Reconnecting in ${delay / 1000}s...`);
    setTimeout(connect, delay);
  }

  connect();
})();
