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
  describe("'/api' | GET | 200", () => {
    xit("responds with JSON file containing server's endpoints and supported queries", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).to.be.a.jsonObj();
        });
    });
  });
  describe("'/apz' | GET | 404", () => {
    xit("responds with not found for any nonexistent path", () => {
      return request(app)
        .get("/apz")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Sorry, path not found!");
        });
    });
  });
  describe("/api'| POST, PATCH, PUT and DELETE | 405", () => {
    xit("responds with error if invalid method is used on specified path", () => {
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
  describe("'/api/topics' | GET | 200", () => {
    it("responds with array of topic objects", () => {
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
  describe("'/api/topics' | PATCH, PUT and DELETE | 405", () => {
    it("responds with error if invalid method is used on specified path", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map((method) => {
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
