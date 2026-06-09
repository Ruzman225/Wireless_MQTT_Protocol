require('dotenv').config();
const app = require('express')();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Twilio_Client = require('twilio')(accountSid, authToken);

const mqtt = require('mqtt');
const options = {
    host: 'b8541613bef0490cbab81b168dca63c5.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Ruzman',
    password: process.env.PASSWORD,
};

const client = mqtt.connect(options);

client.on('connect', function () {
    console.log('Connected to MQTT');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', async function (topic, message) {
    console.log('Received message:', topic, message.toString());

    // 1. Send SMS Notification
    Twilio_Client.messages
        .create({
            body: `New message published: ${message.toString()}`,
            messagingServiceSid: process.env.TWILIO_messagingServiceSid,
            to: process.env.TWILIO_USER,
        })
        .then(msg => console.log('SMS sent, SID:', msg.sid))
        .catch(err => console.log('SMS Error:', err.message));

    // 2. Send WhatsApp Notification
    Twilio_Client.messages
        .create({
            body: `New message published: ${message.toString()}`,
            from: process.env.TWILIO_WA_SENDER,
            to: process.env.TWILIO_WA_RECEIVER,
        })
        .then(msg => console.log('WhatsApp sent, SID:', msg.sid))
        .catch(err => console.log('WhatsApp Error:', err.message));
});

// subscribe to topic 'channel1'
client.subscribe('channel1');

app.listen(process.env.SUB_PORT || 5000, err => {
    console.log(`Server listening at POST ${process.env.SUB_PORT || 5000}`);
});