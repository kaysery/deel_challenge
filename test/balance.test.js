const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
chai.use(chaiHttp);

describe('/balances', ()=>{
    describe('/deposit/:userId',()=>{
        it('should deposits money into the balance of a client',()=>{

            const baseAmount = 1150;

            chai
            .request(app)
            .post('/balances/deposit/1')
            .send({amount:20})
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.contain.keys('id','balance','type');
                expect(res.body.balance).to.be.equal(baseAmount+20);
             });

        });

        it('should fail because the amount is more than 25% his total of jobs to pay',()=>{

            chai
            .request(app)
            .post('/balances/deposit/1')
            .send({amount:1000000})
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.contain.key('error');
                expect(res.body.error).to.be.equal('Clients can\'t deposit more than 25% his total of jobs to pay');
             });

        });

    });
});