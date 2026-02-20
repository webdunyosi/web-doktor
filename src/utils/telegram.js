const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const BASE_URL = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}` : null;

export async function sendToTelegram(message) {
  if (!BASE_URL || !CHAT_ID) {
    console.log('[Telegram fallback] Message:', message);
    return;
  }
  try {
    await fetch(`${BASE_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'HTML' }),
    });
  } catch (err) {
    console.error('Telegram sendMessage error:', err);
  }
}

export async function sendPhotoToTelegram(photoFile, caption) {
  if (!BASE_URL || !CHAT_ID) {
    console.log('[Telegram fallback] Photo:', photoFile?.name, 'Caption:', caption);
    return;
  }
  try {
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', photoFile);
    formData.append('caption', caption);
    await fetch(`${BASE_URL}/sendPhoto`, { method: 'POST', body: formData });
  } catch (err) {
    console.error('Telegram sendPhoto error:', err);
  }
}
