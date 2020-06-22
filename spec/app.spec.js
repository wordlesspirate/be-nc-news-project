process.env.NODE_ENV = "test";
const app = require("../app.js");
const connection = require("../db/connection");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-sorted"));
chai.use(require("sams-chai-sorted"));
chai.use(require("chai-json"));

describe("Tests for Nortcoders News API", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("ROUTES", () => {
    describe("/non-existent-path | GET | 404", () => {
      it("responds with not found for any non-existent path", () => {
        return request(app)
          .get("/nonexistent-path")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Sorry, path not found!");
          });
      });
    });
    describe("/api | GET | 200", () => {
      it("responds with JSON file containing server's endpoints and supported queries", () => {
        return request(app)
          .get("/api")
          .expect(200)
          .then(({ body: { endpoints } }) => {
            expect(endpoints).to.be.a.jsonObj();
          });
      });
    });
    describe("/api | POST, PATCH, PUT and DELETE | 405", () => {
      it("responds with error if invalid method is used on specified path", () => {
        const invalidMethods = ["post", "patch", "put", "delete"];
        const methodPromises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Sorry, method not allowed on this path!");
            });
        });
        return Promise.all(methodPromises);
      });
    });
    //   describe("/api/topics | GET | 200", () => {
    //     it("responds with array of topic objects", () => {
    //       return request(app)
    //         .get("/api/topics")
    //         .expect(200)
    //         .then(({ body: { topics } }) => {
    //           // OK
    //           // console.log(topics);
    //           expect(topics).to.be.an("array");
    //           expect(topics).to.have.lengthOf(3);
    //           expect(topics[0]).to.contain.keys("slug", "description");
    //         });
    //     });
    //   });
    //   describe("/api/topics | POST, PATCH, PUT and DELETE | 405", () => {
    //     it("responds with error if invalid method is used on specified path", () => {
    //       const invalidMethods = ["post", "patch", "put", "delete"];
    //       const methodPromises = invalidMethods.map((method) => {
    //         return request(app)
    //           [method]("/api/topics")
    //           .expect(405)
    //           .then(({ body: { msg } }) => {
    //             // OK
    //             // console.log(msg);
    //             expect(msg).to.equal("Sorry, method not allowed on this path!");
    //           });
    //       });
    //       return Promise.all(methodPromises);
    //     });
    //   });
    //   describe("/api/users/existing-username | GET | 200", () => {
    //     it("responds with user object", () => {
    //       return request(app)
    //         .get("/api/users/butter_bridge")
    //         .expect(200)
    //         .then(({ body: { user } }) => {
    //           // OK
    //           // console.log(user);
    //           expect(user).to.be.an("object");
    //           expect(user).to.contain.keys("username", "avatar_url", "name");
    //           expect(user).to.eql({
    //             username: "butter_bridge",
    //             name: "jonny",
    //             avatar_url:
    //               "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
    //           });
    //         });
    //     });
    //   });
    //   describe("/api/users/non-existent-username | GET | 404", () => {
    //     it("responds with not found for valid but non-existent username", () => {
    //       return request(app)
    //         .get("/api/users/non-existent-username")
    //         .expect(404)
    //         .then(({ body: { msg } }) => {
    //           // OK
    //           // console.log(msg);
    //           expect(msg).to.equal("Sorry, can't find what you are looking for!");
    //         });
    //     });
    //   });
    //   describe("/api/users/existing-username | POST, PATCH, PUT and DELETE | 405", () => {
    //     it("responds with error if invalid method is used on specified path", () => {
    //       const invalidMethods = ["post", "patch", "put", "delete"];
    //       const methodPromises = invalidMethods.map((method) => {
    //         return request(app)
    //           [method]("/api/users/butter_bridge")
    //           .expect(405)
    //           .then(({ body: { msg } }) => {
    //             // OK
    //             // console.log(msg);
    //             expect(msg).to.equal("Sorry, method not allowed on this path!");
    //           });
    //       });
    //       return Promise.all(methodPromises);
    //     });
    //   });
    //   describe("/api/articles | GET | 200", () => {
    //     it("responds with array of article objects", () => {
    //       return request(app)
    //         .get("/api/articles")
    //         .expect(200)
    //         .then(({ body: { articles } }) => {
    //           expect(articles).to.be.an("array");
    //           expect(articles).to.have.lengthOf(12);
    //           expect(articles[0]).to.contain.keys(
    //             "author",
    //             "title",
    //             "article_id",
    //             "topic",
    //             "created_at",
    //             "votes",
    //             "comment_count"
    //           );
    //         });
    //     });
    //   });
    //   describe("/api/articles | POST, PATCH, PUT and DELETE | 405", () => {
    //     it("responds with error if invalid method is used on specified path", () => {
    //       const invalidMethods = ["post", "patch", "put", "delete"];
    //       const methodPromises = invalidMethods.map((method) => {
    //         return request(app)
    //           [method]("/api/articles")
    //           .expect(405)
    //           .then(({ body: { msg } }) => {
    //             expect(msg).to.equal("Sorry, method not allowed on this path!");
    //           });
    //       });
    //       return Promise.all(methodPromises);
    //     });
    //   });
    //   describe("/api/articles/existing-article-id | GET | 200", () => {
    //     it("provided an article_id, responds with corresponding article object", () => {
    //       return request(app)
    //         .get("/api/articles/1")
    //         .expect(200)
    //         .then(({ body: { article } }) => {
    //           // OK?
    //           // console.log(article)
    //           expect(article).to.be.an("object");
    //           expect(article).to.contain.keys(
    //             "article_id",
    //             "title",
    //             "body",
    //             "votes",
    //             "topic",
    //             "author",
    //             "created_at",
    //             "comment_count"
    //           );
    //         });
    //     });
    //   });
    //   describe("/api/articles/invalid-article-id | GET | 400", () => {
    //     it("responds with bad request for invalid article_id", () => {
    //       return request(app)
    //         .get("/api/articles/cats")
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           // OK?
    //           // console.log(msg)
    //           expect(msg).to.equal("Sorry, bad request!");
    //         });
    //     });
    //   });
    //   describe("/api/articles/non-existent-article-id | GET | 404", () => {
    //     it("responds with not found for valid but non-existent article_id", () => {
    //       return request(app)
    //         .get("/api/articles/1000000")
    //         .expect(404)
    //         .then(({ body: { msg } }) => {
    //           // OK?
    //           // console.log(msg)
    //           expect(msg).to.equal("Sorry, can't find what you are looking for!");
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id | PATCH | 200", () => {
    //     it("provided empty inc_votes, responds with article's votes property unchanged", () => {
    //       return request(app)
    //         .patch("/api/articles/1")
    //         .send({})
    //         .expect(200)
    //         .then(({ body: { article } }) => {
    //           expect(article).to.be.an("object");
    //           expect(article).to.contain.keys(
    //             "article_id",
    //             "title",
    //             "body",
    //             "votes",
    //             "topic",
    //             "author",
    //             "created_at"
    //           );
    //           expect(article).to.eql({
    //             article_id: 1,
    //             title: "Living in the shadow of a great man",
    //             topic: "mitch",
    //             author: "butter_bridge",
    //             body: "I find this existence challenging",
    //             created_at: "2018-11-15T12:21:54.171Z",
    //             votes: 101,
    //           });
    //         });
    //     });
    //     it("provided positive inc_votes value, responds with article's votes property increased", () => {
    //       return request(app)
    //         .patch("/api/articles/1")
    //         .send({ inc_votes: 1 })
    //         .expect(200)
    //         .then(({ body: { article } }) => {
    //           expect(article).to.contain.keys("article_id", "votes");
    //           expect(article.votes).to.eql(101);
    //         });
    //     });
    //     it("provided negative inc_votes value, responds with article's votes property decreased", () => {
    //       return request(app)
    //         .patch("/api/articles/1")
    //         .send({ inc_votes: -1 })
    //         .expect(200)
    //         .then(({ body: { article } }) => {
    //           expect(article).to.contain.keys("article_id", "votes");
    //           expect(article.votes).to.eql(99);
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id | PATCH | 400", () => {
    //     it("responds with bad request if inc_votes value is not a number", () => {
    //       return request(app)
    //         .patch("/api/articles/1")
    //         .send({ inc_votes: "cat" })
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.eql("Sorry, bad request!");
    //         });
    //     });
    //     it("responds with bad request if properties other than inc_votes are present", () => {
    //       return request(app)
    //         .patch("/api/articles/1")
    //         .send({ inc_votes: 1, name: "this is my vote" })
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.eql("Sorry, bad request!");
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id | PUT and DELETE | 405", () => {
    //     it("responds with error if invalid method is used on specified path", () => {
    //       const invalidMethods = ["put", "delete"];
    //       const methodPromises = invalidMethods.map((method) => {
    //         return request(app)
    //           [method]("/api/articles/1")
    //           .expect(405)
    //           .then(({ body: { msg } }) => {
    //             expect(msg).to.equal("Sorry, method not allowed on this path!");
    //           });
    //       });
    //       return Promise.all(methodPromises);
    //     });
    //   });
    //   describe("/api/articles/:article_id/comments | GET | 200", () => {
    //     it("responds with array of comment objects", () => {
    //       return request(app)
    //         .get("/api/articles/1/comments")
    //         .expect(200)
    //         .then(({ body: { comments } }) => {
    //           expect(comments[0]).to.contain.keys(
    //             "article_id",
    //             "comment_id",
    //             "author",
    //             "votes",
    //             "created_at",
    //             "body"
    //           );
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id/comments | POST | 201", () => {
    //     it("responds with successfully posted comment", () => {
    //       return request(app)
    //         .post("/api/articles/1/comments")
    //         .send({
    //           body: "My first comment!",
    //           username: "butter_bridge",
    //         })
    //         .expect(201)
    //         .then(({ body: { comment } }) => {
    //           expect(comment).to.contain.keys(
    //             "article_id",
    //             "comment_id",
    //             "author",
    //             "votes",
    //             "created_at",
    //             "body"
    //           );
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id/comments | POST | 400", () => {
    //     it("responds with 400 if comment is empty", () => {
    //       return request(app)
    //         .post("/api/articles/1/comments")
    //         .send({})
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.eql("Sorry, bad request!");
    //         });
    //     });
    //     it("responds with 400 if comment body is empty", () => {
    //       return request(app)
    //         .post("/api/articles/1/comments")
    //         .send({ body: "", username: "butter_bridge" })
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.eql("Sorry, bad request!");
    //         });
    //     });
    //     it("responds with 400 if provided username does not exist", () => {
    //       return request(app)
    //         .post("/api/articles/1/comments")
    //         .send({
    //           body: "a comment",
    //           username: "not-a-valid-username",
    //         })
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.eql("Sorry, bad request!");
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id/comments | PUT and DELETE | 405", () => {
    //     it("responds with error message if invalid method is used on specified path", () => {
    //       const invalidMethods = ["put", "delete"];
    //       const methodPromises = invalidMethods.map((method) => {
    //         return request(app)
    //           [method]("/api/articles/1/comments")
    //           .expect(405)
    //           .then(({ body: { msg } }) => {
    //             expect(msg).to.equal("Sorry, method not allowed on this path!");
    //           });
    //       });
    //       return Promise.all(methodPromises);
    //     });
    //   });
    //   describe("/api/comments/:comment_id | PATCH | 200 ", () => {
    //     it("responds with patched comment", () => {
    //       return request(app)
    //         .patch("/api/comments/1")
    //         .send({ inc_votes: 1 })
    //         .expect(200)
    //         .then(({ body: { comment } }) => {
    //           expect(comment).to.contain.keys("comment_id", "votes");
    //           expect(comment.votes).to.eql(17);
    //         });
    //     });
    //   });
    //   describe("/api/comments/:comment_id | DELETE | 204 ", () => {
    //     it("deletes a comment", () => {
    //       return request(app).delete("/api/comments/1").expect(204);
    //     });
    //   });
    //   describe("/api/comments/cat | DELETE | 400 ", () => {
    //     it("responds with 400 comment_id is of invalid type", () => {
    //       return request(app)
    //         .delete("/api/comments/cat")
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.eql("Sorry, bad request!");
    //         });
    //     });
    //   });
    //   describe("/api/comments/1000000 | DELETE | 400 ", () => {
    //     it("responds with 404 if comment_id is of valid type but does not exist", () => {
    //       return request(app)
    //         .delete("/api/comments/1000000")
    //         .expect(404)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.eql("Sorry, can't find what you are looking for!");
    //         });
    //     });
    //   });
    //   describe("/api/comments/:comment_id | POST, PUT and GET | 405", () => {
    //     it("sends invalid method error message if wrong method is used on defined path", () => {
    //       const invalidMethods = ["post", "put", "get"];
    //       const methodPromises = invalidMethods.map((method) => {
    //         return request(app)
    //           [method]("/api/comments/1")
    //           .expect(405)
    //           .then(({ body: { msg } }) => {
    //             expect(msg).to.equal("Sorry, method not allowed on this path!");
    //           });
    //       });
    //       return Promise.all(methodPromises);
    //     });
    //   });
    // });
    // describe("QUERIES", () => {
    //   describe("/api/articles | GET | 200", () => {
    //     it("sort articles by created_at (descending) by default if no sort_by criteria provided", () => {
    //       return request(app)
    //         .get("/api/articles")
    //         .expect(200)
    //         .then(({ body: { articles } }) => {
    //           expect(articles).to.be.sortedBy("created_at", {
    //             descending: true,
    //           });
    //         });
    //     });
    //   });
    //   describe("/api/articles?sort_by=article_id&order=asc | GET | 200", () => {
    //     it("sort_by and order_by ascending or descending any query containing a valid column name", () => {
    //       return request(app)
    //         .get("/api/articles?sort_by=article_id&order=asc")
    //         .expect(200)
    //         .then(({ body: { articles } }) => {
    //           expect(articles).to.be.sortedBy("article_id");
    //         });
    //     });
    //   });
    //   describe("/api/articles?sort_by=not-a-column | GET | 400", () => {
    //     it("if column does not exist, yields not found", () => {
    //       return request(app)
    //         .get("/api/articles?sort_by=not-a-column")
    //         .expect(400)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.equal("Sorry, bad request!");
    //         });
    //     });
    //   });
    //   describe("/api/articles?topic=cats | GET | 200", () => {
    //     it("can filter data by provided query data - topic", () => {
    //       return request(app)
    //         .get("/api/articles?topic=cats")
    //         .expect(200)
    //         .then(({ body: { articles } }) => {
    //           // console.log(articles, "exists");
    //           expect(articles.every((article) => article.topic === "cats")).to.be
    //             .true;
    //         });
    //     });
    //   });
    //   describe("/api/articles?topic=not-a-topic | GET | 404", () => {
    //     it("can filter data by provided query data - topic, where topic does not exist", () => {
    //       return request(app)
    //         .get("/api/articles?topic=not-a-topic")
    //         .expect(404)
    //         .then(({ body: { msg } }) => {
    //           // console.log(body, "exists");
    //           expect(msg).to.eql("Sorry, can't find what you're looking for!");
    //         });
    //     });
    //   });
    //   describe("/api/articles?author=lurker | GET | 200", () => {
    //     it("can filter data by provided query data - author, where author has no articles", () => {
    //       return request(app)
    //         .get("/api/articles?author=lurker")
    //         .expect(200)
    //         .then(({ body: { articles } }) => {
    //           // console.log(articles, "<--- test for author with no articles");
    //           expect(articles).to.eql([]);
    //         });
    //     });
    //   });
    //   describe("/api/articles?author=butter_bridge | GET | 200", () => {
    //     it("can filter data by provided query data - author, which has articles", () => {
    //       return request(app)
    //         .get("/api/articles?author=butter_bridge")
    //         .expect(200)
    //         .then(({ body: { articles } }) => {
    //           // console.log(articles, "<--- test for author with articles");
    //           expect(
    //             articles.every((article) => article.author === "butter_bridge")
    //           ).to.be.true;
    //         });
    //     });
    //   });
    //   describe("/api/articles?author=not-an-author | GET | 400", () => {
    //     it("404 // if author passed to query does not exist, should yield not found", () => {
    //       return request(app)
    //         .get("/api/articles?author=not-an-author")
    //         .expect(404)
    //         .then(({ body: { msg } }) => {
    //           expect(msg).to.equal("Sorry, can't find what you're looking for!");
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id/comments | GET | 200", () => {
    //     it("given an article_id, comments default sort_by is created at, is descending order", () => {
    //       return request(app)
    //         .get("/api/articles/1/comments")
    //         .expect(200)
    //         .then(({ body: { comments } }) => {
    //           expect(comments).to.be.sortedBy("created_at", {
    //             descending: true,
    //           });
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id/comments?sort_by=comment_id | GET | 200", () => {
    //     it("given an article_id, acepts sort_by queries for any valid, existing column", () => {
    //       return request(app)
    //         .get("/api/articles/1/comments?sort_by=comment_id")
    //         .expect(200)
    //         .then(({ body: { comments } }) => {
    //           expect(comments).to.be.sortedBy("comment_id", {
    //             descending: true,
    //           });
    //         });
    //     });
    //   });
    //   describe("/api/articles/:article_id/comments?order=asc | GET | 200", () => {
    //     it("given an article_id, can revert default sort desc to asc via query", () => {
    //       return request(app)
    //         .get("/api/articles/1/comments?order=asc")
    //         .expect(200)
    //         .then(({ body: { comments } }) => {
    //           expect(comments).to.be.sortedBy("created_at", {
    //             ascending: true,
    //           });
    //         });
    //     });
    //   });
  });
});
