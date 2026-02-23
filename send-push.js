const webpush = require('web-push');

// 1. Generate VAPID keys automatically!
const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// 2. Paste the Subscription JSON from your browser console here
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/...',
  keys: {
    auth: '...',
    p256dh: '...'
  }
};

// 3. Write your custom message payload
const payload = JSON.stringify({
    title: 'Node.js is awesome',
    body: 'Look how much easier this is!'
});

// 4. Fire the push notification!
webpush.sendNotification(pushSubscription, payload)
  .then(() => console.log('✅ Push sent successfully!'))
  .catch(error => console.error('❌ Failed to send push:', error));
