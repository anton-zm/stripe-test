const stripe = require('stripe')('sk_test_51J0RP9GCkX2f6EhoTG0nObEe4frf8SB879cdL3l9HOGrgFbHMwzeNoKzGbJg9eYjW9ie8MvFQMwFsNlJ1bdm9Ior00DlrgdLGK');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.get('/test', (req,res) => {
  res.send('Hello world')
})

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log('Running on port 3000'));