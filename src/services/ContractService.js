const { Contract } = require('../models/model');
const { Op } = require("sequelize");

const getContractById = async ({id, profileId}) => {
    const contract = await Contract.findOne({
        attributes: { exclude: ['ContractorId', 'ClientId'] },
        where: { 
            id,
            [Op.or]: [{ ContractorId: profileId },{ ClientId: profileId }] 
        }
    });
    return contract;
}

const getAllActiveContracts = async (profileId) => {
    const contracts = await Contract.findAll({
        attributes: { exclude: ['ContractorId', 'ClientId'] },
        where: {
            [Op.or]: [{ ContractorId: profileId },{ ClientId: profileId }],
            status:{[Op.not]:"terminated"}
        }
    });
    return contracts;
}



module.exports = {
    getContractById,
    getAllActiveContracts
}