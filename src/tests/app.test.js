const request = require("supertest");
const app = require("../app.js");
const emails = require("email-generator");
const { disconnectDB } = require("../mongo");

describe("POST /register", () => {
  //Verificar que funciona como esperado cuando tiene toda la info
  describe("Has username, name, and password", () => {
    // debe responder con un 201
    test("Response status 201", async () => {
      const response = await request(app).post("/register").send({
        email: emails.generateEmail(),
        password: "1234",
        firstName: "John Snow",
      });
      expect(response.statusCode).toBe(201);
    });

    // debe responder con un jwt
    test("Response contains a jwt", async () => {
      const response = await request(app).post("/register").send({
        email: emails.generateEmail(),
        password: "1234",
        firstName: "John Snow",
      });
      expect(response.body["token"]).toBeDefined();
    });
  });

  // Tener el error capturado cuando falta password o email
  describe("Missing information", () => {
    test("Response status 400", async () => {
      const missingInfo = [
        { email: emails.generateEmail() },
        { password: "1234" },
        { firstName: "John Snow" },
      ];
      missingInfo.forEach(async (info) => {
        const response = await request(app).post("/register").send(info);
        expect(response.statusCode).toBe(400);
      });
    });
  });

  // Tener el error capturado cuando ya esta registrado el email
  describe("Email already registered", () => {
    test("Response status 400", async () => {
      const response = await request(app).post("/register").send({
        email: "existing@mail.com",
        password: "1234",
        firstName: "John Snow",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("POST /login", () => {
  //Verificar que funciona como esperado cuando tiene toda la info
  describe("Has username and password", () => {
    // debe responder con un 200
    test("Response status 200", async () => {
      const response = await request(app).post("/login").send({
        email: "some@mail.com",
        password: "1234",
      });
      expect(response.statusCode).toBe(200);
    });
    // debe responder con un jwt
    test("Response contains a jwt", async () => {
      const response = await request(app).post("/login").send({
        email: "existing@mail.com",
        password: "1234",
      });
      expect(response.body["token"]).toBeDefined();
    });
  });
  // Tener el error capturado cuando falta password o email
  describe("Missing information", () => {
    test("Response status 400", async () => {
      const response = await request(app).post("/login").send({
        email: "existing@mail.com",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  afterAll(() => {
    disconnectDB();
  });
});
