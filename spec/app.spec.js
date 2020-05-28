process.env.NODE_ENV = "test";
const app = require("../app.js");
const connection = require("../db/connection");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-sorted"));
chai.use(require("sams-chai-sorted"));
chai.use(require("chai-json"));

describe("methods and routes in 'app' for NC News project", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("Method: GET | Path: '/api' | Status: 200", () => {
    it("responds with JSON file containing server's endpoints and supported queries", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).to.be.a.jsonObj();
        });
    });
  });
  describe("Method: GET | Path: '/apz' | Status: 404", () => {
    it("responds with not found for any nonexistent path", () => {
      return request(app)
        .get("/apz")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Sorry, path not found!");
        });
    });
  });
  describe("Method: INVALID METHODS (PATCH, PUT and DELETE) | Path: '/api' | Status: 405", () => {
    it("sends invalid method error message if wrong method is used on specified path", () => {
      const invalidMethods = ["patch", "put", "delete"];
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
});
