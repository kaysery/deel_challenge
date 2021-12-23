const ContractRouter = require('express').Router();
const contractController = require('../controllers/ContractController');

ContractRouter.get('/:id',async (req, res) =>{
    const { id } = req.params;
    const profileId = req.get('profile_id');
    const contract = await contractController.getContractById({id,profileId});
    if(!contract) return res.status(404).end();
    res.json(contract);
})

ContractRouter.get('/',async (req, res) =>{
    const profileId = req.get('profile_id');
    const contracts = await contractController.getAllActiveContracts(profileId);
    if(!contracts) return res.status(404).end();
    res.json(contracts);
})

module.exports = ContractRouter;