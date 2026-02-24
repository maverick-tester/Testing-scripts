// Also inside public/sw.js (at the bottom)
self.addEventListener('notificationclick', function(event) {
    // 1. Immediately close the notification so it disappears
    event.notification.close();

    // 2. Define the URL you want to force open
    const targetUrl = 'https://example.com/your-lab-landing-page';

    // 3. Figure out what exactly they clicked
    if (event.action === 'execute_payload') {
        // They clicked the "Update Now" button
        console.log('Victim clicked the primary button.');
        event.waitUntil(clients.openWindow(targetUrl));

    } else if (event.action === 'ignore') {
        // They clicked "Remind Me Later"
        console.log('Victim dismissed the alert.');
        // Do nothing else, the notification is already closed

    } else {
        // They clicked the main body of the notification (not a specific button)
        console.log('Victim clicked the main notification body.');
        event.waitUntil(clients.openWindow(targetUrl));
    }
});
