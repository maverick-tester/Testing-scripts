const enableBtn = document.getElementById('enable-btn');
const publicVapidKey = 'PASTE_YOUR_PUBLIC_KEY_HERE'; // Don't forget your key!

enableBtn.addEventListener('click', async () => {
    console.log('Button clicked! Asking for permission...');

    // 1. Ask for permission FIRST, before doing anything else
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
        console.error('Permission denied by user.');
        return; // Stop running if they said no
    }
    
    console.log('Permission granted! Now looking for Service Worker...');

    try {
        // 2. NOW try to register the Service Worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker found and registered!');
        
        // 3. Subscribe the user
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicVapidKey
        });

        // 4. Send it to your Node backend
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        });
        
        console.log('Success! Subscription sent to backend.');

    } catch (error) {
        // If the sw.js file 404s, it will print the error here instead of silently crashing!
        console.error('Something broke:', error);
    }
});
