const BalanceRouter = require('express').Router();
const balanceController = require('../controllers/BalanceController');

BalanceRouter.post('/deposit/:userId',async (req, res) =>{
    const {userId} = req.params;
    const {amount} = req.body;
    const result = await balanceController.deposit({userId,amount});
    res.json(result);
})

module.exports = BalanceRouter;