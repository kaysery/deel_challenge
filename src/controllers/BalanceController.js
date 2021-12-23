const balanceService = require('../services/BalanceService');

const deposit = async ({userId, amount}) => {
        const result = await balanceService.deposit({userId,amount});
        return result;
}

module.exports = {
    deposit
}