const expectExport = require('expect');
const request = require('supertest');

var {app} = require('../app');

// Test landing page
describe('Landing page route exists.', () => {
  it("Landing page working.", async () => {
    const res = await request(app).get('/');
    expectExport(res.statusCode).toEqual(200);
  });
});

// Test plants page
describe('Plants page route exists.', () => {
  it("Plants page working.", async () => {
    const res = await request(app).get('/plants');
    expectExport(res.statusCode).toEqual(200);
  });
});

// Test contact us page
describe('Contact us page route exists.', () => {
  it("Contact us page working.", async () => {
    const res = await request(app).get('/contact');
    expectExport(res.statusCode).toEqual(200);
  });
});

// Test account login page
describe('Login page route exists.', () => {
  it("Login page working.", async () => {
    const res = await request(app).get('/auth/login');
    expectExport(res.statusCode).toEqual(200);
  });
});

// Test account register page
describe('Register page route exists.', () => {
  it("Register page working.", async () => {
    const res = await request(app).get('/auth/register');
    expectExport(res.statusCode).toEqual(200);
  });
});