const { Transaction } = require('../models');

exports.createTransaction = async (req, res) => {
    const { seller_id, buyer_id, product_name, quantity, amount } = req.body;
    const transaction = await Transaction.create({
        seller_id,
        buyer_id,
        product_name,
        quantity,
        amount
    });
    res.json(transaction);
};

exports.getSellerTransactions = async (req, res) => {
    const { seller_id } = req.params;
    const transactions = await Transaction.findAll({ where: { seller_id } });
    res.json(transactions);
};
