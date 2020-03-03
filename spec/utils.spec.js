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
  it("For an array containing only one object, converts timestamp ('created_at') to date.", () => {
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
  it("For an array containing several objects, converts timestamps ('created_at') to date.", () => {
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

describe("formatComments()", () => {
  it("If no input is provided, returns an empty array.", () => {
    const input = [];
    const articleReference = {};
    const output = [];
    expect(formatComments(input, articleReference)).to.eql(output);
  });
  it("For an array containing only one comment object, returns comment with certain keys modified.", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articleReference = { "They're not exactly dogs, are they?": 1 };
    const output = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      }
    ];
    expect(formatComments(input, articleReference)).to.eql(output);
  });
  it("For an array containing several comment objects, returns comment with certain keys modified.", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const articleReference = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2
    };
    const output = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 2,
        author: "butter_bridge",
        votes: 14,
        created_at: new Date(1479818163389)
      }
    ];
    expect(formatComments(input, articleReference)).to.eql(output);
  });
  it("Original input has not been mutated.", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articleReference = { "They're not exactly dogs, are they?": 1 };
    formatComments(input, articleReference);
    expect(input).to.eql([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ]);
  });
});
