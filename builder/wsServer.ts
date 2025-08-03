import Logger from '@builder/logger.ts';

const clients = new Set<WebSocket>();
let isConnectedToClient = clients.size !== 0 || false;

export function startWSServer() {
  Logger.info('[WSServer] WebSocket server is running on http://localhost:8080');
  Deno.serve({ port: 5000 }, (req: Request) => {
    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.onopen = () => {
      Logger.info('[WSServer] Client connected');
      clients.add(socket);
      isConnectedToClient = true;
    };

    socket.onmessage = (event) => {
      Logger.info('[WSServer] Received message from client:', event.data);
      socket.send(`Server echo: ${event.data}`);
    };

    socket.onclose = () => {
      Logger.info('[WSServer] Client disconnected');
      clients.delete(socket);
    };

    socket.onerror = (err) => {
      Logger.error('[WSServer] WebSocket error:', err);
      clients.delete(socket);
      isConnectedToClient = false;
    };

    return response;
  });
}

export const reloadWSClients = (message = 'reload') => {
  if (!isConnectedToClient) {
    Logger.error('[WSServer] Websocket Server not started skipping notify.');
  }

  for (const client of clients) {
    try {
      client.send(message);
    } catch (err) {
      Logger.error('[WSServer] Failed to send message to a client:', err);
    }
  }
};
