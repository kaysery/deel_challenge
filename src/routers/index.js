const {getProfile} = require('../middlewares/getProfile')
const mainRouter = require('express').Router();
const contractRouter = require('./ContractRouter');
const jobRouter = require('./JobRouter');
const adminRouter = require('./AdminRouter');
const balanceRouter = require('./BalanceRouter');
const bodyParser = require('body-parser');


mainRouter.use(bodyParser.json());
mainRouter.use(getProfile);
mainRouter.use('/contracts',contractRouter);
mainRouter.use('/jobs',jobRouter);
mainRouter.use('/admin',adminRouter);
mainRouter.use('/balances',balanceRouter);

module.exports = mainRouter;