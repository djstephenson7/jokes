const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');

const expect = chai.expect;

require('sinon-mongoose');

const Joke = require('../app/models/joke.model');

describe('Get all Jokes', () => {
  it('Should  return all jokes', (done) => {
    const MockJoke = sinon.mock(Joke);
    const expectedResult = { status: true, joke: 'Some mock joke' };
    MockJoke.expects('find').yields(null, expectedResult);
    Joke.find((err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('Should return an error', (done) => {
    const MockJoke = sinon.mock(Joke);
    const expectedResult = { status: false, error: 'Something went wrong' };
    MockJoke.expects('find').yields(null, expectedResult);
    Joke.find((err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(result.status).not.to.be.true;
      done();
    });
  });
});

describe('Post a new Joke', () => {
  it('Should create a new joke', (done) => {
    const MockJoke = sinon.mock(new Joke({ joke: 'New Mock joke' }));
    const joke = MockJoke.object;
    const expectedResult = { status: false };
    MockJoke.expects('save').yields(expectedResult, null);
    joke.save((err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
  it('Should return an error if the joke fails to save', (done) => {
    const MockJoke = sinon.mock(new Joke({ joke: 'Save new Joke from mock' }));
    const joke = MockJoke.object;
    const expectedResult = { status: false };
    MockJoke.expects('save').yields(expectedResult, null);
    joke.save((err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe('Delete a joke by id', () => {
  it('Should delete a joke by id', (done) => {
    const MockJoke = sinon.mock(Joke);
    const expectedResult = { status: true };
    MockJoke.expects('remove').withArgs({ _id: 12345 }).yields(null, expectedResult);
    Joke.remove({ _id: 12345 }, (err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  // Test will pass if the joke is not deleted based on an ID
  it('Should return error if delete action failed', (done) => {
    const MockJoke = sinon.mock(Joke);
    const expectedResult = { status: false };
    MockJoke.expects('remove').withArgs({ _id: 12345 }).yields(expectedResult, null);
    Joke.remove({ _id: 12345 }, (err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});