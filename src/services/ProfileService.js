const { Job, Contract, Profile } = require('../models/model');
const { Op } = require("sequelize");

const getClientProfile = async (profileId) =>{
    const clientProfile = await Profile.findOne({where: {id: profileId, type: 'client'}});
    return clientProfile;
}

const getContractorProfile = async(profileId) =>{
    const contractorProfile = await Profile.findOne({where: {id: profileId, type: 'contractor'}});
    return contractorProfile;
}

module.exports ={
    getClientProfile,
    getContractorProfile,
}