const AdminRouter = require('express').Router();
const adminController = require('../controllers/AdminController');

AdminRouter.get('/best-profession',async (req, res) =>{
    const {start: startDate, end: endDate} = req.query;
    const profession = await adminController.getBestProfession({startDate,endDate});
    if(!profession) return res.status(404).end();
    res.json(profession);
})

AdminRouter.get('/best-clients',async (req, res) =>{
    const {start: startDate, end: endDate, limit} = req.query;
    const clients = await adminController.getBestClients({startDate,endDate,limit});
    if(!clients) return res.status(404).end();
    res.json(clients);
})

module.exports = AdminRouter;