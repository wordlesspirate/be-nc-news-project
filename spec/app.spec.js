process.env.NODE_ENV = "test";
const app = require("../app.js");
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
chai.use(chaiSorted);
chai.use(require("sams-chai-sorted"));
const connection = require("../db/connection");

describe("app", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/not-a-route", () => {
    it("status 404 // responds with 404 for non-existent path", () => {
      return request(app)
        .get("/apo/topicz")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Sorry, path not found!");
        });
    });
  });
  describe("/api", () => {
    describe("/topics", () => {
      describe("GET", () => {
        it("status 200 // responds with an array of topic objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({ body: { topics } }) => {
              expect(topics).to.be.an("array");
              expect(topics).to.have.lengthOf(3);
              expect(topics[0]).to.contain.keys("slug", "description");
            });
        });
      });
      describe("INVALID METHODS", () => {
        it("status 405 // sends invalid method error message if wrong method is used on defined path", () => {
          const invalidMethods = ["patch", "put", "delete"];
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]("/api/topics")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Sorry, method not allowed on this path!");
              });
          });
          return Promise.all(methodPromises);
        });
      });
    });
    describe("/users/:username", () => {
      describe("GET", () => {
        it("status 200 // responds with a user object", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).to.be.an("object");
              expect(user).to.contain.keys("username", "avatar_url", "name");
              expect(user).to.eql({
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              });
            });
        });
        it("status 404 // responds with 404 for a valid, but non-existent username", () => {
          return request(app)
            .get("/api/users/non-existent-username")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal(
                "Sorry, can't find what you are looking for!"
              );
            });
        });
        describe("INVALID METHODS", () => {
          it("status 405 // sends invalid method error message if wrong method is used on defined path", () => {
            const invalidMethods = ["patch", "put", "delete"];
            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]("/api/users/butter_bridge")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal(
                    "Sorry, method not allowed on this path!"
                  );
                });
            });
            return Promise.all(methodPromises);
          });
        });
      });
    });
    describe("/articles", () => {
      describe("GET", () => {
        it("status 200 // responds with an array of article objects", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.be.an("array");
              expect(articles).to.have.lengthOf(12);
              expect(articles[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
            });
        });
        it("200 // if no sort_by criteria provided, sorts articles by 'created_at' (descending) by default", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.be.sortedBy("created_at", {
                descending: true
              });
            });
        });
        it("200 // can sort and order by ascending or descending any query containing a valid column name", () => {
          return request(app)
            .get("/api/articles?sort_by=article_id&order=asc")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles).to.be.sortedBy("article_id");
            });
        });
        it.only("200 // can filter data by provided query data", () => {
          return request(app)
            .get("/api/articles?topic=cats")
            .expect(200)
            .then(({ body: { articles } }) => {
              console.log({ articles });
              expect(articles.every(article => article.topic === "cats")).to.be
                .true;
            });
        });
      });
      describe("INVALID METHODS", () => {
        it("status 405 // sends invalid method error message if wrong method is used on defined path", () => {
          const invalidMethods = ["patch", "put", "delete", "post"];
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]("/api/articles")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Sorry, method not allowed on this path!");
              });
          });
          return Promise.all(methodPromises);
        });
      });
      describe("/:article_id", () => {
        describe("GET", () => {
          it("status 200 // when provided an 'article_id', responds with an article object", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article).to.be.an("object");
                expect(article).to.contain.keys(
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at",
                  "comment_count"
                );
              });
          });
          it("status 400 // responds with 400 for an invalid article_id", () => {
            return request(app)
              .get("/api/articles/cats")
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Sorry, bad request!");
              });
          });
          it("status 404 // responds with 404 for a valid, but non-existent article_id", () => {
            return request(app)
              .get("/api/articles/1000000")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal(
                  "Sorry, can't find what you are looking for!"
                );
              });
          });
        });
        describe("PATCH", () => {
          it("status 200 // responds with updated article, accessed and updated via 'article_id'", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article).to.contain.keys("article_id", "votes");
                expect(article.votes).to.eql(101);
              });
          });
          it("status 200// responds with 400 if 'inc_votes' is empty", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({})
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Sorry, bad request!");
              });
          });
          it("status 400 // responds with 400 if 'inc_votes' is not a number", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: "cat" })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Sorry, bad request!");
              });
          });
          it("status 400 // responds with 400 if properties other than 'inc_votes' are present", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 1, name: "this is my vote" })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Sorry, bad request!");
              });
          });
        });
        describe("INVALID METHODS", () => {
          it("status 405 // sends invalid method error message if wrong method is used on defined path", () => {
            const invalidMethods = ["put", "delete"];
            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]("/api/articles/1")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal(
                    "Sorry, method not allowed on this path!"
                  );
                });
            });
            return Promise.all(methodPromises);
          });
        });
      });
      describe("/:article_id/comments", () => {
        describe("GET", () => {
          it("status 200 // responds with array of comment objects", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments[0]).to.contain.keys(
                  "article_id",
                  "comment_id",
                  "author",
                  "votes",
                  "created_at",
                  "body"
                );
              });
          });
          it("200 // given an article_id, comments default sort_by is created at, is descending order", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("200 // given an article_id, acepts sort_by queries for any valid, existing column", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=comment_id")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("comment_id", {
                  descending: true
                });
              });
          });
          it("200 // given an article_id, can revert default sort desc to asc via query", () => {
            return request(app)
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).to.be.sortedBy("created_at", {
                  ascending: true
                });
              });
          });
        });
        describe("POST", () => {
          it("status 201 // responds with successfully posted comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                body: "My first comment!",
                username: "butter_bridge"
              })
              .expect(201)
              .then(({ body: { comment } }) => {
                expect(comment).to.contain.keys(
                  "article_id",
                  "comment_id",
                  "author",
                  "votes",
                  "created_at",
                  "body"
                );
              });
          });
          it("status 400 // responds with 400 if comment body is empty", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({})
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Sorry, bad request!");
              });
          });
          it("status 400 // responds with 400 if comment body is empty", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ body: "", username: "butter_bridge" })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Sorry, bad request!");
              });
          });
          it("status 400 // responds with 400 if provided username does not exist", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                body: "a comment",
                username: "not-a-valid-username"
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.eql("Sorry, bad request!");
              });
          });
        });
        describe("INVALID METHODS", () => {
          it("status 405 // sends invalid method error message if wrong method is used on defined path", () => {
            const invalidMethods = ["put", "delete"];
            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]("/api/articles/1/comments")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal(
                    "Sorry, method not allowed on this path!"
                  );
                });
            });
            return Promise.all(methodPromises);
          });
        });
      });
      describe("/comments", () => {
        describe("/:comment_id", () => {
          describe("PATCH", () => {
            it("status 200 // responds with patched comment", () => {
              return request(app)
                .patch("/api/comments/1")
                .send({ inc_votes: 1 })
                .expect(200)
                .then(({ body: { comment } }) => {
                  expect(comment).to.contain.keys("comment_id", "votes");
                  expect(comment.votes).to.eql(17);
                });
            });
          });
          describe("DELETE", () => {
            it("status 204 // deletes a comment", () => {
              return request(app)
                .delete("/api/comments/1")
                .expect(204);
            });
            it("status 400 // responds with 400 comment_id is of invalid type", () => {
              return request(app)
                .delete("/api/comments/cat")
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql("Sorry, bad request!");
                });
            });
            it("status 404 // responds with 404 if comment_id is of valid type but does not exist", () => {
              return request(app)
                .delete("/api/comments/1000000")
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).to.eql(
                    "Sorry, can't find what you are looking for!"
                  );
                });
            });
          });
          describe("INVALID METHODS", () => {
            it("status 405 // sends invalid method error message if wrong method is used on defined path", () => {
              const invalidMethods = ["put", "post", "get"];
              const methodPromises = invalidMethods.map(method => {
                return request(app)
                  [method]("/api/comments/1")
                  .expect(405)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal(
                      "Sorry, method not allowed on this path!"
                    );
                  });
              });
              return Promise.all(methodPromises);
            });
          });
        });
      });
    });
  });
});
