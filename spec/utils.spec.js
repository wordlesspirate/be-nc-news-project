const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates()", () => {
  it("If no input is provided, returns an empty array.", () => {
    const input = [];
    const output = [];
    expect(formatDates(input)).to.eql(output);
  });
  it("For an array containing only one object, converts timestamp to date.", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const output = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      }
    ];
    expect(formatDates(input)).to.eql(output);
  });
  it("For an array containing several objects, converts timestamps to date.", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const output = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1289996514171)
      }
    ];
    expect(formatDates(input)).to.eql(output);
  });
  it("Original input has not been mutated.", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    formatDates(input);
    expect(input).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
  });
});

describe("makeRefObj()", () => {
  it("If no input is provided, returns an empty object.", () => {
    const input = [];
    const output = {};
    expect(makeRefObj(input)).to.eql(output);
  });
  it("For an array containing only one object, creates a reference object containing one reference.", () => {
    const input = [{ article_id: 1, title: "A" }];
    const output = { A: 1 };
    expect(makeRefObj(input)).to.eql(output);
  });
  it("For an array containing several objects, creates a reference object containing several references.", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" }
    ];
    const output = { A: 1, B: 2 };
    expect(makeRefObj(input)).to.eql(output);
  });
  it("Original input has not been mutated.", () => {
    const input = [{ article_id: 1, title: "A" }];
    makeRefObj(input);
    expect(input).to.eql([{ article_id: 1, title: "A" }]);
  });
});

describe("formatComments", () => {});
