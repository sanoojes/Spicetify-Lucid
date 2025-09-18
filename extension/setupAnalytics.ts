import { createLogger } from '@app/logger.ts';
import appStore from '@store/appStore.ts';
// import { getSpotifyTokenHeader } from '@/utils/fetch/getSpotifyToken.ts';
import { io, type Socket } from 'socket.io-client';

const logger = createLogger('[Analytics]');
const ANALYTIC_SERVER_URL = 'https://analytics.lucid.sanooj.is-a.dev';

type AnalyticType = 'theme' | 'lyrics_extension' | 'glassify_theme';
const TYPE: AnalyticType = 'theme';

let socket: Socket | null = null;

// function setToken(key: string, value: string, expiresAt: number) {
//   localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
// }

// function getToken(key: string) {
//   const stored = localStorage.getItem(key);
//   if (!stored) return null;

//   try {
//     const { value, expiresAt } = JSON.parse(stored);
//     if (Date.now() > expiresAt) {
//       localStorage.removeItem(key);
//       return null;
//     }
//     return value;
//   } catch {
//     localStorage.removeItem(key);
//     return null;
//   }
// }

// async function getAuth(): Promise<string> {
//   let token = getToken('lyrics_auth');
//   if (token) return token;

//   const Authorization = await getSpotifyTokenHeader();
//   if (!Authorization) throw new Error('Failed to get Spotify Auth token');

//   const res = await fetch(`${ANALYTIC_SERVER_URL}/token`, {
//     headers: new Headers({ Authorization }),
//   });

//   if (!res.ok) throw new Error('Failed to get JWT token from server');

//   const data = await res.json();
//   token = data.token;
//   const expiresAt = data.expiresAt;

//   if (!token || !expiresAt) throw new Error('Failed to parse JWT token');

//   setToken('lyrics_auth', token, expiresAt);
//   return token;
// }

export async function setupAnalytics(
  isAnalyticsActive: boolean = appStore.getState().isAnalyticsActive
) {
  try {
    if (!isAnalyticsActive) {
      if (socket) {
        socket.disconnect();
        socket = null;
        logger.info('Disconnected');
      }
      return;
    }

    if (socket?.connected) {
      logger.info('Already active');
      return;
    }

    const pingRes = await fetch(`${ANALYTIC_SERVER_URL}/ping`);
    if (!pingRes.ok) {
      logger.error('Server ping failed, not starting socket.');
      if (socket) {
        socket.disconnect();
        socket.close();
        socket = null;
      }
      return;
    }

    // const JWT_TOKEN = await getAuth();

    socket = io(`${ANALYTIC_SERVER_URL}/ws/users`, {
      auth: { type: TYPE },
      closeOnBeforeunload: true,
    });

    console.log(socket);

    let connectionAttempts = 0;
    const MAX_RETRIES = 3;

    socket.on('connect', () => {
      logger.info('Connected');
      connectionAttempts = 0;
    });

    socket.on('disconnect', (reason) => {
      logger.info('Disconnected:', reason);
    });

    socket.on('connect_error', (err: Error) => {
      logger.error('Connection error:', err.message);

      connectionAttempts++;
      // if (err.message.includes("Authentication")) {
      //   localStorage.removeItem("lyrics_auth");
      //   logger.debug("Cleared invalid JWT token, please reconnect.");
      // }

      if (connectionAttempts >= MAX_RETRIES) {
        logger.error(`Server unreachable after ${MAX_RETRIES} attempts. Stopping socket.`);
        socket?.disconnect();
        socket?.close();
        socket = null;
        return;
      }

      setTimeout(async () => {
        logger.info('Retrying connection...');
        await setupAnalytics(true);
      }, 5000);
    });
  } catch (err: any) {
    logger.error('Setup Error:', err?.message ?? err);
  }
}

appStore.subscribe((state) => state.isAnalyticsActive, setupAnalytics);
