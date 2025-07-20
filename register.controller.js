const bcrypt = require('bcrypt');
const { User, Buyer, Seller } = require('../models');

exports.registerBuyer = async (req, res) => {
    const { email, phone, password, pan } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, phone, password_hash: hashedPassword, role: 'buyer' });
    const buyerId = `B-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    await Buyer.create({ user_id: user.id, pan, buyer_id: buyerId });
    res.json({ message: 'Buyer registered', buyerId });
};

exports.registerSeller = async (req, res) => {
    const { email, phone, password, businessName, gstId, businessType, industrySector, numEmployees } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, phone, password_hash: hashedPassword, role: 'seller' });
    const sellerId = `S-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    await Seller.create({
        user_id: user.id,
        business_name: businessName,
        business_type: businessType,
        gst_id: gstId,
        industry_sector: industrySector,
        num_employees: numEmployees,
        seller_id: sellerId
    });
    res.json({ message: 'Seller registered', sellerId });
};
