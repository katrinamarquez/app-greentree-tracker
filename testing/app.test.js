const request = require('supertest');
var { app } = require('../app');

// Test that you can get plants
describe("Plants route test", () => {
  it('plants route working yeet', async () => {
    const res = await request(app)
    .get('/plants')
  expect(res.statusCode).toEqual(200)
  })
})

// Test logging in as a Admin
describe("User logging in test", () => {
  it('user logged in', async () => {
    request(app)
      .post('/auth/login')
      .set({
        username: 'Admin',
        password: 'Password123'
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      })
  })
});

// Test creating plants
describe("Creating a plant as admin user", () => {
  it('creating plant as admin user', async () => {
    request(app)
      .post('/plants/new')
      .set({
        botanical_name: 'planta testa',
        price: 60,
        pot_size: '350mm',
        category: 'ground cover'
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
      })
  })
});

// Test that you can login as a user (not an admin)
describe("User logging in test", () => {
  it('user logged in', async () => {
    request(app)
      .post('/auth/login')
      .set({
        username: 'Katrina Test',
        password: 'password'
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      })
  })
});

// Test that you can register as a user
describe("User registering account test", () => {
  it('user registered', async () => {
    request(app)
      .post('/auth/register')
      .set({
        username: 'Imma User',
        email: 'email@email.com',
        password: 'password'
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      })
  })
});