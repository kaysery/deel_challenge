const { Job, Contract, Profile } = require('../models/model');
const { Op } = require("sequelize");

const DEFAULT_LIMIT = 2;

const getBestProfession = async ({ startDate, endDate }) => {
    const professions = await Job.findOne({
        attributes: {
            include: [
                'Contract->Contractor.profession',
                [Job.sequelize.fn('sum', Job.sequelize.col('price')), 'price']
            ],
        },
        include: {
            model: Contract,
            attributes: { exclude: ['ContractorId', 'ClientId'] },
            include: {
                model: Profile, as: 'Contractor',
                where: {
                    type: 'contractor'
                },
            }
        },
        where: {
            paid: true,
            paymentDate: { [Op.between]: [startDate, endDate] },
        },
        group: ['profession'],
        order: [[Job.sequelize.fn('sum', Job.sequelize.col('price')), 'DESC']],
    });
    return professions;
}




const getBestClients = async ({ startDate, endDate, limit }) => {
    const clients = await Job.findAll({
        attributes: {
            include: ['Contract->Client.id', [Job.sequelize.fn('sum', Job.sequelize.col('price')), 'price']]
        },
        include: {
            model: Contract,
            attributes: { exclude: ['ContractorId', 'ClientId'] },
            include: { model: Profile, as: 'Client' }
        },
        where: {
            paid: true,
            paymentDate: { [Op.between]: [startDate, endDate] },
        },
        group: ['Contract->Client.id'],
        order: [[Job.sequelize.fn('sum', Job.sequelize.col('price')), 'DESC']],
        limit: limit || DEFAULT_LIMIT,
    });
    return clients;
}



module.exports = {
    getBestProfession,
    getBestClients,
}