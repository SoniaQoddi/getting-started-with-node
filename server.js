'use strict';

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;

// App
const app = express();

app.get('/', (req, res) => {
  const currentDate = new Date().toLocaleString();
  res.send(`Hello this is Sonia and I m testing real time deployments on Qoddi!!<br>Current date and time: ${currentDate}`);
});

// New API endpoint for EUR/USD rate
app.get('/api/eurusd', async (req, res) => {
  try {
    const response = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=USD');
    const data = await response.json();
    if (data && data.rates && data.rates.USD) {
      res.json({ rate: data.rates.USD });
    } else {
      res.status(500).json({ error: 'Failed to get EUR/USD rate' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
