// public/main.js
const publicVapidKey = 'PASTE_YOUR_PUBLIC_KEY_HERE'; // <--- Paste Public Key here!

const enableBtn = document.getElementById('enable-btn');

enableBtn.addEventListener('click', async () => {
    // 1. Register Service Worker
    const registration = await navigator.serviceWorker.register('/sw.js');
    
    // 2. Subscribe the user
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    });

    // 3. Send the subscription to your Node server!
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        }
    });

    console.log('Subscription sent to server!');
});
