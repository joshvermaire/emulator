/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';


var app = require('../index'),
    kraken = require('kraken-js'),
    request = require('supertest'),
    assert = require('assert');


describe('index', function () {

    var mock;


    beforeEach(function (done) {
        kraken.create(app).listen(function (err, server) {
            mock = server;
            done(err);
        });
    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('GET /profile?user=me should give {user:"me"}', function (done) {
        request(mock)
            .get('/profile?user=me')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('{"user":"me"}')
            .end(function(err, res){
                done(err);
            });
    });
    it('GET /profile?user=me&response[user]=you should give {user:"you"}', function (done) {
        request(mock)
            .get('/profile\?user\=me\&response\[user\]\=you')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('{"user":"you"}')
            .end(function(err, res){
                done(err);
            });
    });
    it('POST {user:"me"} to /profile  should give {user:"me"}', function (done) {
        request(mock)
            .post('/profile')
            .send({ user: 'me' })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect('{"user":"me"}')
            .end(function(err, res){
                done(err);
            });
    });

});
