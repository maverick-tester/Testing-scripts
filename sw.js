// ==========================================
// 1. THE PUSH EVENT (Receiving the Data)
// ==========================================
self.addEventListener('push', function(event) {
    let data;

    // The Bulletproof Parse: Safely handle JSON or text without crashing
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        console.error('Failed to parse JSON, falling back to text:', e);
        data = { 
            title: 'System Alert', 
            body: event.data ? event.data.text() : 'Default body',
            url: 'https://google.com' // Fallback URL if JSON fails
        };
    }

    // Set defaults just in case the Node server forgets to send them
    const finalTitle = data.title || 'System Alert';
    const finalBody = data.body || 'You have a new message.';
    const finalUrl = data.url || 'https://google.com'; 

    const options = {
        body: finalBody,
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827370.png',
        
        // Hide the dynamic URL inside the notification data
        data: {
            redirectUrl: finalUrl 
        },
        
        actions: [
            { action: 'execute_payload', title: 'Update Now' },
            { action: 'ignore', title: 'Remind Me Later' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(finalTitle, options)
    );
});


// ==========================================
// 2. THE CLICK EVENT (Handling the Interaction)
// ==========================================
self.addEventListener('notificationclick', function(event) {
    // Immediately close the notification box
    event.notification.close();

    // Pull the dynamic URL that we hid in the data object above
    const targetUrl = event.notification.data.redirectUrl;

    if (event.action === 'execute_payload') {
        // Victim clicked "Update Now"
        event.waitUntil(clients.openWindow(targetUrl));

    } else if (event.action === 'ignore') {
        // Victim clicked "Remind Me Later"
        console.log('Victim dismissed the alert.');

    } else {
        // Victim clicked the main body of the notification
        event.waitUntil(clients.openWindow(targetUrl));
    }
});
