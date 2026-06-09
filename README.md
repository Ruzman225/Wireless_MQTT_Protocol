# Wireless MQTT Protocol Communication Bridge

A lightweight, end-to-end IoT middleware solution designed to capture local HTTP triggers and route them through a cloud-based MQTT broker to deliver real-time SMS and WhatsApp notifications via the Twilio API.

## 🚀 Features
* **Multi-Protocol Bridging:** Seamlessly translates HTTP POST requests into MQTT payloads.
* **Cloud Routing:** Utilizes HiveMQ Cloud for secure, low-latency message brokering.
* **Real-Time Alerts:** Instantly dispatches mobile notifications (SMS & WhatsApp) using the Twilio REST API.
* **Fault-Tolerant:** Built with Node.js, featuring asynchronous error handling to prevent server crashes during cellular network delays.

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Protocols:** MQTT, HTTP/REST
* **Cloud Services:** HiveMQ Cloud, Twilio Programmable Messaging

## 🏗️ Architecture Flow
1. **Trigger:** `Postman` sends an HTTP POST request containing a JSON payload.
2. **Publish:** The `Publisher.js` server receives the request and publishes it to the HiveMQ Cloud broker.
3. **Broker:** `HiveMQ` routes the message securely via the `channel1` topic.
4. **Subscribe:** The `Subscriber.js` server detects the incoming message.
5. **Notify:** The Subscriber triggers the Twilio API, delivering the payload as an SMS and WhatsApp message to the registered mobile device.

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/YourUsername/Wireless-MQTT-Bridge.git](https://github.com/YourUsername/Wireless-MQTT-Bridge.git)
cd Wireless-MQTT-Bridge