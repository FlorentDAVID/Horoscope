const request = require('supertest');
const { app, start } = require('./app'); // Import your Express app and the start function

let server; // Declare a variable to hold the server instance

beforeAll(async () => {
  server = await start(8080); // Start the server before the tests
});

afterAll(async () => {
  await server.close(); // Close the server after all tests are done
});

// Nominal case
describe('GET /sign?day=4&month=8', () => {
  it('should return the sign', async () => {
      const response = await request(server).get('/sign?day=4&month=8');
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('The zodiac sign for 4/8 is Leo');

  });
});

// wrong day format
describe('GET /sign?day=Four&month=8', () => {
    it('should return the error : day must be a number', async () => {
        const response = await request(server).get('/sign?day=Four&month=8');
  
      expect(response.status).toBe(400);
      expect(response.text).toBe('day must be a number');
    });
  });

// wrong month format
describe('GET /sign?day=4&month=Nine', () => {
    it('should return the error : month must be a number', async () => {
        const response = await request(server).get('/sign?day=4&month=Nine');
  
      expect(response.status).toBe(400);
      expect(response.text).toBe('month must be a number');
    });
  });


// wrong day value
describe('GET /sign?day=35&month=8', () => {
    it('should return the error : Day must be in the range of 1 to 31', async () => {
        const response = await request(server).get('/sign?day=35&month=8');
  
      expect(response.status).toBe(400);
      expect(response.text).toBe('Day must be in the range of 1 to 31');
    });
  });

// wrong month value
describe('GET /sign?day=5&month=13', () => {
    it('should return the error : Month must be in the range of 1 to 12', async () => {
        const response = await request(server).get('/sign?day=5&month=13');
  
      expect(response.status).toBe(400);
      expect(response.text).toBe('Month must be in the range of 1 to 12');
    });
  });

// Nominal case with date
describe('GET /signByDate?date=12-31-1988', () => {
    it('should return the sign', async () => {
        const response = await request(server).get('/signByDate?date=12-31-1988');
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('The zodiac sign for 31/12 is Capricorn');
  
    });
  });


// Wrong Date format
describe('GET /signByDate?date=NotMonth-31-1988', () => {
    it('should return Invalid date error', async () => {
        const response = await request(server).get('/signByDate?date=NotMonth-31-1988');
    
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid date');
  
    });
  });

// Wrong Date value
describe('GET /signByDate?date=13-31-1988', () => {
    it('should return Invalid date error', async () => {
        const response = await request(server).get('/signByDate?date=13-31-1988');
    
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid date');
  
    });
  });