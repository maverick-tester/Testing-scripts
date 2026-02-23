const enableBtn = document.getElementById('enable-btn');

enableBtn.addEventListener('click', async () => {
    // Step 1: Check if the browser even supports Service Workers
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        alert('Push notifications are not supported by your browser.');
        return;
    }

    // Step 2: Ask the user for permission
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
        console.error('Permission not granted for Notification');
        alert('You blocked the notifications!');
        return;
    }

    // Step 3: Register the Service Worker
    try {
        const registration = await navigator.serviceWorker.register('sw.js');
        console.log('Service Worker successfully registered!', registration);
        alert('Permission granted and Service Worker registered! Check your F12 Developer Console.');
    } catch (error) {
        console.error('Service Worker registration failed:', error);
    }
});
