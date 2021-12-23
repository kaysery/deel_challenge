const { sequelize } = require('../models/model');
const { getTotalPendingJobs } = require('./JobService');
const { getClientProfile } = require('./ProfileService');
const MAX_PENCENTAGE_ALLOWED = 0.25;



const deposit = async ({userId, amount}) => {

    try {
        const clientProfile = await getClientProfile(userId);
        if (!clientProfile)
            return { error: 'Client not found' };

        if (!await isOnRangeAllowed({userId, amount}))
            return { error: 'Clients can\'t deposit more than 25% his total of jobs to pay' };


        return await sequelize.transaction(async (t) =>
            await clientProfile.update({ balance: clientProfile.balance + amount }, { transaction: t }));


    } catch (e) {
        console.log(e);
        return { error: 'Error on transaction' }
    }

}

const isOnRangeAllowed = async ({userId, amount}) => {
    const totalPending = await getTotalPendingJobs(userId);
    return amount <= (totalPending * MAX_PENCENTAGE_ALLOWED);
}


module.exports = {
    deposit
}

