process.env.NODE_ENV = "test";
const app = require("../app.js");
const request = require("supertest");
const { expect } = require("chai");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/topics", () => {
    describe("GET", () => {
      it("status:200 // responds with an array of topic objects", () => {
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
  });
});
