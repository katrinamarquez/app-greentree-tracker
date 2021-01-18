const expectExport = require('expect');
const request = require('supertest');

var { app } = require('../app');

describe('Plants page route exists.', () => {
  it("Plants page working.", async () => {
    const res = await request(app).get('/plants');
    expectExport(res.statusCode).toEqual(200);
  });
});

describe('Login page route exists.', () => {
  it("Login page working.", async () => {
    const res = await request(app).get('/auth/login');
    expectExport(res.statusCode).toEqual(200);
  });
});

describe('Register page route exists.', () => {
  it("Register page working.", async () => {
    const res = await request(app).get('/auth/register');
    expectExport(res.statusCode).toEqual(200);
  });
});