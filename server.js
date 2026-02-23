// server.js
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set up Express to serve your HTML/JS files and parse JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Paste your keys here!
const publicVapidKey = 'PASTE_YOUR_PUBLIC_KEY_HERE';
const privateVapidKey = 'PASTE_YOUR_PRIVATE_KEY_HERE';

webpush.setVapidDetails(
    'mailto:test@example.com',
    publicVapidKey,
    privateVapidKey
);

// This endpoint catches the subscription from your frontend
app.post('/subscribe', (req, res) => {
    // Get the push subscription object
    const subscription = req.body;

    // Send a 201 Created status back to the frontend
    res.status(201).json({});

    // Create your custom payload
    const payload = JSON.stringify({ 
        title: 'Node.js Automation', 
        body: 'It worked! No more copy-pasting!' 
    });

    // Fire off the push notification immediately!
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
