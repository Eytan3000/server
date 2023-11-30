// const express = require('express');
// require('dotenv').config();

import express from 'express';
import dotenv from 'dotenv';
import twiml  from 'twilio';
const { MessagingResponse } = twiml;

const app = express();
const port = process.env.PORT || 3000;

app.get('/send-message', (req, res) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      body: 'eytan test 1',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+972508657032',
    })
    .then((message) => console.log(message.sid));

  res.send('Hello, World!');
});


// const { MessagingResponse } = require('twilio').twiml;


app.post('/receive', (req, res) => {

  const twiml = new MessagingResponse();

  twiml.message('אין קבלת הודעות למספר זה');

  res.type('text/xml').send(twiml.toString());
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
