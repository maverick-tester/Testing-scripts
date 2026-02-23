self.addEventListener('push', function(event) {
    console.log('Push message received!');
    const messageText = event.data ? event.data.text() : 'You have a new alert!';
    const options = {
        body: messageText,
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827370.png', // Just a generic bell icon
        vibrate: [200, 100, 200]
    };
    event.waitUntil(
        self.registration.showNotification('Ngrok Lab Alert', options)
    );
});
