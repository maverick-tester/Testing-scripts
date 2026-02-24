self.addEventListener('push', function(event) {
    let data;
    
    // Safely try to parse the JSON. If it fails, do not crash!
    try {
        data = event.data ? event.data.json() : {};
    } catch (e) {
        console.error('Failed to parse JSON, falling back to text:', e);
        data = { 
            title: 'Fallback Title', 
            body: event.data ? event.data.text() : 'Default body' 
        };
    }

    // Ensure we have fallback text just in case the JSON was empty
    const finalTitle = data.title || 'System Alert';
    const finalBody = data.body || 'You have a new message.';

    const options = {
        body: finalBody,
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827370.png',
        actions: [
            { action: 'execute_payload', title: 'Update Now' },
            { action: 'ignore', title: 'Remind Me Later' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(finalTitle, options)
    );
});
