const adminService = require('../services/AdminService');
const adminMapper = require('./mappers/AdminMapper');

const getBestProfession = async ({ startDate, endDate }) => {
    try {
        const profession = await adminService.getBestProfession({ startDate, endDate });
        return adminMapper.mapBestProfession(profession);
    } catch (e) {
        return { error: 'Error on transaction' };
    }

}

const getBestClients = async ({ startDate, endDate, limit }) => {
    try {
        const clients = await adminService.getBestClients({ startDate, endDate, limit });
        if (clients && clients.length > 0)
            return clients.map(adminMapper.mapBestClients);
    } catch (e) {
        return { error: 'Error on transaction' };
    }

}

module.exports = {
    getBestProfession,
    getBestClients,
}