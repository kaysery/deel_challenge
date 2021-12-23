const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
chai.use(chaiHttp);

describe('/jobs', ()=>{

    describe('/unpaid',()=>{
        it('should return all unpaid jobs for a client or contractor with active contracts',()=>{

            chai
            .request(app)
            .get('/jobs/unpaid')
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.be.length(1);
                expect(res.body[0]).to.contain.keys('paid','paymentDate','Contract');
                expect(res.body[0].Contract.status).to.be.equal('in_progress');
             });

        });
    });

    describe('/:job_id/pay',()=>{
        it('should return a list of non terminated contracts belonging to a user (client or contractor)',()=>{
            chai
            .request(app)
            .post('/jobs/2/pay')
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.contain.keys('paid','paymentDate','Contract');
                expect(res.body.paid).to.be.true;
                expect(res.body.paymentDate).to.not.be.null;
             });

        });
    });
    

});