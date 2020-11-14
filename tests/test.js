let Post = require('../postModel');
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
// let mongoose = require("mongoose");
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../index');

// config chai 
chai.use(chaiHttp);
chai.should();

//Our parent block
describe('Posts', () => {
    beforeEach((done) => { //Before each test we empty the database
        Post.remove({}, (err) => {
           done();
        });
    });
});

describe("Posts", () => {
    
    beforeEach((done) => { //Before each test we empty the database
        Post.remove({}, (err) => {
           done();
        });
    });

    describe("GET /api/posts", () => {
        // Test to get all posts 
        it("should get all posts", (done) => {
            chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('message').eql('Posts retrieved successfully');
            done();
            });
        });

        // Test to get a specific post
        it("should get a single post", (done) => {
            let post = new Post({title:"Test Post to be retrieved by id", description:"This is a test post to be retrieved by id"});
            post.save((err, post) => {
                chai.request(app)
                .get('/api/posts/' + post.id)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Post retrieved by id successfully');
                done();
                });
            })
        });
    });
    

    // Test to POST new post
    describe("POST /api/posts", () => {
        it("should add a new post", (done) => {
            let post = new Post({title:"My Test Post to bed added", description:"This is a test post to be added"});
            chai.request(app)
            .post('/api/posts')
            .send(post)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('message').eql('New post created');
                done();
            })
        });
    })

    // Test to DELETE a post
    describe("DELETE /api/posts", () => {
        it("should delete a post of a specific id", (done) => {
            let post = new Post({title:"Test Post to be deleted", description:"This is a test post to be deleted"});
            post.save(() => {
                chai.request(app)
                .delete('/api/posts/' + post.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Post deleted');
                done();
                });
            })
        });
    })

    // Test to UPDATE a post
    describe("UPDATE /api/posts", () => {
        it("should update a post", (done) => {
            let post = new Post({title:"Test Post to be updated", description:"This is a test post to be updated"});
            post.save(() => {
                chai.request(app)
                .put('/api/posts/' + post.id)
                .send({title:"Tested post is updated", description:"This test post has been updated"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Post updated');
                done();
                });
            })
            // post.save(() => {
            //     chai.request(app)
            //     .post('/api/posts')
            //     .end((err, res) => {
            //         res.should.have.status(200);
            //         res.body.should.be.a('object');
            //         res.body.should.have.property('status').eql('success');
            //         res.body.should.have.property('message').eql('Post updated');
            //     done();
            //     });
            // })
        });
    })
})
