/*
 * Title: Application tests
 * Description: Test suites for the application
 * Author: Minhajul Karim
 * Date: 9 Aug 2021
 */

// Dependencies
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const db = require('../models');

// Test suite for testing the index route
describe('index route', () => {
  test('should respond with 200 for GET request', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  test('should respond with 404 for requesting bogus routes', async () => {
    const response = await request.get('/foobar');
    expect(response.status).toBe(404);
  });
});

// Test suite for testing the customers route
describe('/customers route', () => {
  test('should return status code 200', async () => {
    const response = await request.get('/customers');
    expect(response.status).toBe(200);
  });

  test('should contain content-type=text/html', async () => {
    const response = await request.get('/customers');
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('should contain <p class="lead">Customers</p> inside body', async () => {
    const response = await request.get('/customers');
    expect(response.text).toMatch(/<p class="lead">Customers<\/p>/);
  });
});

// Test suite for testing the /customers/add route
describe('/customers/add route', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test('should return status code 200 visiting /customers/add route', async () => {
    const response = await request.get('/customers/add');
    expect(response.status).toBe(200);
  });

  test('should display the form when users visit customers/add route', async () => {
    const response = await request.get('/customers/add');
    expect(response.text).toMatch(
      /<form action="\/customers\/add" method="POST">/,
    );
  });

  test.only('should redirect to homepage after creating a new user', async () => {
    const response = await request
      .post('/customers/add')
      .send('name=Jobayer Mojumder&email=job@gmail.com&phone=0190909090909');
    expect(response.status).toBe(302);
  });
});
