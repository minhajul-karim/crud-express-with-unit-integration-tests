/*
 * Title: Application tests
 * Description: Test suites for the application
 * Author: Minhajul Karim
 * Date: 9 Aug 2021
 */

// Dependencies
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

// Test suite for testing the index route
describe("index route", () => {
  test("should respond with 200 for GET request", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  test("should respond with 404 for requesting bogus routes", async () => {
    const response = await request.get('/foobar')
    expect(response.status).toBe(404)
  })
});

// Test suite for testing the customers route
describe("/customers route", () => {
  test("should return status code 200", async () => {
    const response = await request.get("/customers");
    expect(response.status).toBe(200);
  });

  test("should contain content-type=text/html", async () => {
    const response = await request.get("/customers");
    expect(response.headers["content-type"]).toMatch(/html/);
  });

  test('should contain <p class="lead">Customers</p> inside body', async () => {
    const response = await request.get("/customers");
    expect(response.text).toMatch(/<p class="lead">Customers<\/p>/);
  });
});
