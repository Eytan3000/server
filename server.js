// const express = require('express');
// require('dotenv').config();

import dotenv from 'dotenv';
import express from 'express';
import twilio  from 'twilio';
import cron from 'node-cron';


dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

app.get('/send-message', (req, res) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: 'eytan test 1',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+972508657032',
    })
    .then((message) => console.log(message.sid));

  res.send('Hello, World!');
});


const { MessagingResponse } = twilio.twiml;


app.post('/receive', (req, res) => {

  const twiml = new MessagingResponse();

  twiml.message('אין קבלת הודעות למספר זה');

  res.type('text/xml').send(twiml.toString());
});


// const cron = require('node-cron');

function runScript() {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: 'eytan test 1',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+972508657032',
    })
}

// Schedule the script to run every day at 19:00
cron.schedule('51 16 * * *', () => {
  console.log('Running the script...');
  runScript();
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
