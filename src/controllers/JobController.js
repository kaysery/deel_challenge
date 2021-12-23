const jobService = require('../services/JobService');

const getUnpaidJobs = async (profileId) => {
    try {
        const unpaidJobs = await jobService.getUnpaidJobs(profileId);
        return unpaidJobs;
    } catch (e) {
        return {error:'Error on transaction'};
    }
}

const payJob = async ({jobId,clientId}) =>{
        const result = await jobService.payJob({jobId,clientId});
        return result;
}


module.exports = {
    getUnpaidJobs,
    payJob,
}