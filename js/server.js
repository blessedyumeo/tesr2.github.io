const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const yooKassa = require('yookassa');

const app = express();
app.use(bodyParser.json());

const yooKassaClient = new yooKassa({
    shopId: 'YOUR_SHOP_ID',
    secretKey: 'YOUR_SECRET_KEY'
});

app.post('/create-order', async (req, res) => {
    const { items, total, customer } = req.body;
    const idempotenceKey = uuid.v4();
    const orderId = uuid.v4();

    try {
        const payment = await yooKassaClient.createPayment({
            amount: {
                value: total.toFixed(2),
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            confirmation: {
                type: 'embedded'
            },
            capture: true,
            description: `Заказ №${orderId}`,
            metadata: {
                orderId,
                customer_email: customer.email,
                customer_phone: customer.phone
            },
            receipt: {
                customer: {
                    email: customer.email,
                    phone: customer.phone
                },
                items: items.map(item => ({
                    description: item.name,
                    quantity: item.quantity || 1,
                    amount: {
                        value: item.price.toFixed(2),
                        currency: 'RUB'
                    },
                    vat_code: '1',
                    payment_mode: 'full_payment',
                    payment_subject: 'commodity'
                }))
            }
        }, idempotenceKey);

        res.json({
            id: orderId,
            confirmation_token: payment.confirmation.confirmation_token
        });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: 'Payment failed' });
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));