const { User, Buyer, Seller, Transaction } = require('../models');

exports.getAllBuyers = async (req, res) => {
    const buyers = await Buyer.findAll();
    res.json(buyers);
};

exports.getAllSellers = async (req, res) => {
    const sellers = await Seller.findAll();
    res.json(sellers);
};

exports.getAllTransactions = async (req, res) => {
    const transactions = await Transaction.findAll();
    res.json(transactions);
};

exports.deactivateUser = async (req, res) => {
    const { userId } = req.params;
    await User.update({ is_active: false }, { where: { id: userId } });
    res.json({ message: 'User deactivated' });
};
