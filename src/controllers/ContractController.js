const contractService = require('../services/ContractService');

const getContractById = async ({id, profileId}) => {
    try {
        const contract = await contractService.getContractById({id, profileId});
        return contract;
    } catch (e) {
        return {error:'Error on transaction'};
    }

}

const getAllActiveContracts = async (profileId) => {
    try {
        const contract = await contractService.getAllActiveContracts(profileId);
        return contract;
    } catch (e) {
        return {error:'Error on transaction'};
    }
}

module.exports = {
    getContractById,
    getAllActiveContracts
}