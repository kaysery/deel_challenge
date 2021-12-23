const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
chai.use(chaiHttp);

describe('/contracts', ()=>{

    describe('/:id',()=>{
        it('should return the contract only if it belongs to the profile calling',()=>{

            chai
            .request(app)
            .get('/contracts/1')
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.contain.keys('id','terms','status');
             });

        });
    });

    describe('/',()=>{
        it('should return a list of non terminated contracts belonging to a user (client or contractor)',()=>{
            chai
            .request(app)
            .get('/contracts')
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.contain.keys('id','terms','status');
                expect(res.body[0].status).to.not.be.equal('terminated');
             });

        });
    });
    

});