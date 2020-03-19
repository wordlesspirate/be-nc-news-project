# NC News Project

This is a project completed as part of the review process of Northcoder's Backend curriculum.

## Step 1 - Setting up your own copy of the repository:

Clone the repository:

```bash
git clone https://github.com/wordlesspirate/be-nc-news-project

cd be-nc-news-project
```

## Step 2 - Prerequisites

Here is a list of some of the tools you will need to install:

- `npm i knex pg`
- `npm i express`
- `npm i -D chai`
- `npm i -D mocha`
- `npm i -D supertest`

(Alternatively, run `npm i` in your terminal to install all necessary tools through your `package.json` file.)

## Step 3 - Running the tests

In order to run the tests for this API, please take into account that the test suite `app.spec.js` has the environament variable set to test, therefore only the test data will be used for the seed file and running of tests.

To run the tests, simply run the command `npm t`, as this will trigger the seed file to run and then run the corresponding tests.
