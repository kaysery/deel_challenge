const JobRouter = require('express').Router();
const jobController = require('../controllers/JobController');

JobRouter.get('/unpaid',async (req, res) =>{
    const profileId = req.get('profile_id');
    const jobs = await jobController.getUnpaidJobs(profileId);
    if(!jobs) return res.status(404).end();
    res.json(jobs);
});

JobRouter.post('/:job_id/pay',async(req,res)=>{

    const {job_id: jobId} = req.params;
    const clientId = req.get('profile_id');
    const result = await jobController.payJob({jobId,clientId});
    res.json(result);

});


module.exports = JobRouter;