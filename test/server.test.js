'use strict';

const app = require('../server');
const chai = require('chai');
const spy = require('chai-spies');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(spy);

describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {

  it('GET request "/" should return the index of the page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        
      });
  });
});

//404 handler test

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    const spy = chai.spy;
    return chai.request(app)
      .get('/bad/path')
      .then(spy)
      .then(() => {
        expect(spy).to.not.have.been.called();
      })
      .catch(err => {
        expect(err.response).to.have.status(404);
      });
  });

});

//GET by ID handler test 

describe('Get handler by ID', function () {

  it('Should grab note by ID', function () {
    return chai.request(app)
      .get('/v1/notes')
      .then(function (res) {
        return chai.request(app)
          .get(`/v1/notes/${res.body[0].id}`);
      })
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body).to.include.keys('title', 'content');
        expect(res.body.id).to.not.equal(null);
      });
  }); 
  it('should respond with 404 when given a bad path', function () {
    const spy = chai.spy;
    return chai.request(app)
      .get('/v1/notes/badpath')
      .then(spy)
      .then(() => {
        expect(spy).to.not.have.been.called();
      })
      .catch(err => {
        expect(err.response).to.have.status(404);
      });
  });
  
});


//GET handler test

describe('Get handler', function () {
  
  it('should list notes on GET', function () {
    return chai.request(app)
      .get('/v1/notes')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(1);

        const keys = ['id', 'title', 'content'];
        res.body.forEach(val => {
          expect(val).to.be.a('object');
          expect(val).to.include.keys(keys);
        });
      })
      .catch(err => {
        expect(err.response).to.have.status(404);
      });
  });
  it('should respond with 404 when given a bad path', function () {
    const spy = chai.spy;
    return chai.request(app)
      .get('/v1/notesbadpath')
      .then(spy)
      .then(() => {
        expect(spy).to.not.have.been.called();
      })
      .catch(err => {
        expect(err.response).to.have.status(404);
      });
  });
});

//POST handler test

describe('Post handler', function () {
  
  it('should post a new note on POST', function (){
    const note = {title: 'NAME', content: 'Some string.......'};
    return chai.request(app)
      .post('/v1/notes')
      .send(note)
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body).to.include.keys('title', 'content');
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(Object.assign(note, { id: res.body.id }));
      })
      .catch(err => {
        expect(err.response).to.have.status(400);
      });
  });
  it('should respond with 404 if note was incorrectly POSTED', function () {
    const note = { title: [], content: 1 };
    return chai.request(app)
      .post('/v1/notes')
      .send(note)
      .then(function (res) {
      })
      .catch(err => {
        expect(err.response).to.have.status(404);
      });
  });
});

//PUT handler test

describe('Put handler', function () {
  
  it('should update a note', function(){
    const update = { title: 'NAME', content: 'some other string......' };
    return chai.request(app)
      .get('/v1/notes')
      .then(function (res) {
        update.id = res.body[0].id;
        return chai.request(app)
          .put(`/v1/notes/${update.id}`)
          .send(update);
      })
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.deep.equal(update);
      })
      .catch(err => {
        expect(err.response).to.have.status(400);
      });
  });
  it('should respond with 400 if PUT request was bad', function () {
    const update = { name: 'NAME', content: 'some other string......' };
    return chai.request(app)
      .get('/v1/notes')
      .then(function (res) {
        update.id = res.body[0].id;
        return chai.request(app)
          .put(`/v1/notes/${update.id}`)
          .send(update);
      })
      .catch(err => {
        expect(err.response).to.have.status(400);
      });
  });
});

//DELETE handler test

describe('Delete handler', function () {
  it('should delete note on DELETE', function () {
    return chai.request(app)
      .get('/v1/notes')
      .then(function (res) {
        return chai.request(app)
          .delete(`/v1/notes/${res.body[0].id}`);
      })
      .then(function (res) {
        expect(res).to.have.status(204);
      });
  }); 
  it('should respond with 404 if Delete id not found', function () {
    return chai.request(app)
      .get('/v1/notes')
      .then(function (res) {
        return chai.request(app)
          .delete('/v1/notes/badpath');
      })
      .catch(err => {
        expect(err.response).to.have.status(404);
      });
  }); 
});