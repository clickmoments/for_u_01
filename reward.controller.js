const { Transaction, RewardPoint, RewardRule } = require('../models');

exports.calculatePoints = async (req, res) => {
    const { buyer_id } = req.params;
    const rule = await RewardRule.findOne();
    const transactions = await Transaction.findAll({ where: { buyer_id } });
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const points = Math.floor(totalSpent / 100) * rule.points_per_100_rs;

    let rewardPoint = await RewardPoint.findOne({ where: { buyer_id } });
    if (!rewardPoint) {
        rewardPoint = await RewardPoint.create({ buyer_id, points });
    } else {
        rewardPoint.points = points;
        await rewardPoint.save();
    }

    res.json({ buyer_id, points, threshold: rule.threshold });
};
