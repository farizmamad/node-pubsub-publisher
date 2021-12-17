const express = require('express');
const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('pet-app listening on port', port);
});

app.post('/lab-report', async (req, res) => {
    try{
        const labReport = req.body;
        await publishPubSubMessage(labReport);
        res.status(204).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

async function publishPubSubMessage(labReport) {
    const buffer = Buffer.from(JSON.stringify(labReport));
    await pubsub.topic('new-lab-report').publish(buffer);
}