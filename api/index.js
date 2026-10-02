import { app, initializeApp } from '../server/index.js';

export default async function handler(req, res) {
  try {
    await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error('Failed to initialize API:', error);
    return res.status(500).json({ error: 'API initialization failed' });
  }
}
