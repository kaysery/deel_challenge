const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
chai.use(chaiHttp);



describe('/admin', ()=>{

    describe('/best-clients',()=>{
        it('should return the clients the paid the most for jobs in the query time period',()=>{

            chai
            .request(app)
            .get('/admin/best-clients?start=2020-08-10&end=2020-08-17')
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(2);
                expect(res.body[0]).to.contain.keys('id','fullName','paid');
             });

        });
    });

    describe('/best-profession',()=>{
        it('should return the profession that earned the most money (sum of jobs paid)',()=>{

            chai
            .request(app)
            .get('/admin/best-profession?start=2020-08-10&end=2020-08-18')
            .set('profile_id', 1)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                 expect(res.body).to.be.an('object');
                 expect(res.body).to.have.property('name').and.to.be.equal('Programmer');
                 expect(res.body).to.have.property('total_paid');
             });

        });
    });
    

});