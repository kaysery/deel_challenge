const { Job, Contract, sequelize } = require('../models/model');
const { Op } = require("sequelize");
const { getClientProfile, getContractorProfile } = require('./ProfileService');

const getJob = async (jobId) => {
    const job = await Job.findByPk(jobId, { include: { model: Contract } });
    return job;
}

const getUnpaidJobs = async (profileId) => {
    const jobs = await Job.findAll({
        attributes: { exclude: ['ContractId'] },
        include: {
            model: Contract,
            attributes: { exclude: ['id', 'ContractorId', 'ClientId'] },
            where: {
                [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
                status: 'in_progress'
            }
        },
        where: {
            paid: { [Op.not]: true },
        }
    });
    return jobs;
}

const payJob = async ({ jobId, clientId }) => {

    try {

        const job = await getJob(jobId);

        if (!job)
            return { error: 'Job not found' };

        if (job.paid)
            return { error: 'Job already paid' };

        const clientProfile = await getClientProfile(clientId);

        if (!clientProfile)
            return { error: 'Client not found' };

        const { Contract: { ContractorId } } = job;
        const contractorProfile = await getContractorProfile(ContractorId);

        if (clientProfile.balance >= job.price) {
            return await sequelize.transaction(async (t) => {
                await contractorProfile.update({ balance: contractorProfile.balance + job.price }, { transaction: t });
                await clientProfile.update({ balance: clientProfile.balance - job.price }, { transaction: t });
                return await job.update({ paid: true, paymentDate: Date.now() }, { transaction: t });
            });
        } else {
            return { error: 'Insufficient balance' }
        }


    } catch (e) {
        console.log(e);
        return { error: 'Error on transaction' }
    }

}

const getTotalPendingJobs = async (userId) => {
    try {
        const sumTotalPrice = await Job.findOne({
            attributes: {
                include: [[Job.sequelize.fn('sum', Job.sequelize.col('price')), 'price']]
            },
            include: {
                model: Contract,
                where: {
                    ClientId: userId
                }
            },
            where: {
                paid: { [Op.not]: true },
            }
        });

        return sumTotalPrice.price ? sumTotalPrice.price : 0;

    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    getUnpaidJobs,
    getTotalPendingJobs,
    payJob
}