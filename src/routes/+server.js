import { json } from '@sveltejs/kit';
import { sendDataToTelegram } from '$lib/func/telegram';
import { sendDataToSheets } from '$lib/func/sheets';

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {

    const formData = await request.formData();
    const name = formData.get('name');
    const phoneNumber = formData.get('phoneNumber');
    const email = formData.get('email');
    const paymentMethod = formData.get('paymentMethod');
    const accName = formData.get('accName');
    const accNumber = formData.get('accNumber');
    const game = formData.get('game');
    const selectedBank = formData.get('selectedBank') === 'LAINNYA' ? formData.get('otherBank') : formData.get('selectedBank');
    const selectedPulsa = formData.get('selectedPulsa');
    const selectedEmoney = formData.get('selectedEmoney');
    const linkWa = phoneNumber.startsWith('0') ? 'https://wa.me/62' + phoneNumber.slice(1) : 'https://wa.me/' + phoneNumber;


    // Sheets Data
    const sheetsData = {
        game,
        accName,
        phoneNumber: phoneNumber.startsWith('0') ? '62' + phoneNumber.slice(1) : phoneNumber,
        email,
        paymentMethod: paymentMethod.toUpperCase(),
        accName,
        accNumber,
        selectedBank,
        selectedEmoney,
        linkWa
    }
    // console.log(sheetsData, '<<<<<<<<<<<<<<<<<<<<<sheetsData');

    // Send Data to Sheets
    const responseSheets = await sendDataToSheets(sheetsData);
    // console.log(responseSheets, '<<<<<<<<<<<<<<<<<<<<<responseSheets');


    const telegramMessage = `
🎉 Member Baru 🎉

=== ${game} ===
Nama: ${accName}
HP: ${phoneNumber}
Email: ${email}
Payment Method: ${paymentMethod}
${paymentMethod === 'bank' ? `Bank: ${selectedBank}\nNama Rek: ${accName}` : paymentMethod === 'pulsa' ? `Provider: ${selectedPulsa}` : paymentMethod === 'emoney' ? `E-Money: ${selectedEmoney}` : ''}
${paymentMethod === 'bank' ? `No Rek: ${accNumber}` : paymentMethod === 'pulsa' ? `No HP: ${accNumber}` : paymentMethod === 'emoney' ? `No E-Money: ${accNumber}` : ''}

🗂️ PERLU DIFOLLOW-UP 💬
    `;
    // console.log(telegramMessage, '<<<<<<<<<<<<<<<<<<<<<telegramMessage');

    // Send Message to Telegram
    const responseTelegram = await sendDataToTelegram(telegramMessage);
    // console.log(responseTelegram, '<<<<<<<<<<<<<<<<<<<<<responseTelegram');

    return json({ success: true });

}