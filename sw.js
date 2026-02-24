self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    
    const finalTitle = data.title || 'System Alert';
    const finalBody = data.body || 'You have a new message.';
    // Grab the URL from Node, or provide a safe default
    const finalUrl = data.url || 'https://google.com'; 

    const options = {
        body: finalBody,
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827370.png',
        
        // 👇 Attach the URL to the notification's hidden data object 👇
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
