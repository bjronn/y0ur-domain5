import { json } from '@sveltejs/kit';
import { SECRET_SHEETS_WEB_APP } from '$env/static/private'

export async function sendDataToSheets(data) {
    // console.log(data, '<<<<<<<<<<<<<<<<<<<<<data');

    const sheetsWebApp = SECRET_SHEETS_WEB_APP;
    // console.log(sheetsWebApp, '<<<<<<<<<<<<<<<<<<<<<sheetsWebApp');

    try {
        const response = await fetch(sheetsWebApp, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        // console.log(response, '<<<<<<<<<<<<<<<<<<<<<response-sheets.js');

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
