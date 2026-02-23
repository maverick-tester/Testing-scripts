self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'Default', body: 'Default message' };

    const options = {
        body: data.body,
        // The main logo next to the text
        icon: 'https://example.com/path/to/main-logo.png', 
        // The tiny monochrome origin icon
        badge: 'https://example.com/path/to/tiny-badge.png',
        // A large image embedded inside the notification
        image: 'https://example.com/path/to/large-banner.jpg',
        
        // Keeps the notification on screen until the user dismisses it
        requireInteraction: true 
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
