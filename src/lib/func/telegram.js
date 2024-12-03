import { json } from '@sveltejs/kit';
import { SECRET_TELEGRAM_BOT_ID, SECRET_TELEGRAM_BOT_KEY, SECRET_TELEGRAM_CHAT_ID } from '$env/static/private'

export async function sendDataToTelegram(message) {
    const TelegramAPI = `https://api.telegram.org/${SECRET_TELEGRAM_BOT_ID}:${SECRET_TELEGRAM_BOT_KEY}/sendMessage?chat_id=-${SECRET_TELEGRAM_CHAT_ID}`;


    try {
        const response = await fetch(
            TelegramAPI,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: message,
                }),
            }
        );

        if (response.ok) {
            return json({ success: true });
        } else {
            return json({ success: false, error: 'Error submitting form. Please try again.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return json({ success: false, error: 'Error submitting form. Please try again.' });
    }


}
