import { expect } from "chai";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.qa", override: true });

const port = process.env.PORT || 8080;
const request = supertest(`http://localhost:${port}/api`); // Cambia la URL según tu configuración

describe("===== TEST AUTH =====", () => {
  let userTest;

  before(async () => {
    console.log(
      `🔌 Initializing tests and connecting to the server on port: ${port}...`
    );
    await request.delete("/user/delete/all"); // Limpia la colección antes de cada prueba
  });

  it("[Auth] /auth/register - Should register a new user", async () => {
    const newUser = {
      first_name: "Marito",
      last_name: "Borgues",
      email: "marito.borgues@mail.com",
      password: "123456",
    };

    const { status, body } = await request.post("/auth/register").send(newUser);
    if (status !== 201) console.error("Error response:", body);

    userTest = body.payload;

    expect(status).to.be.equal(201);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(userTest.first_name).to.be.equal("marito");
    expect(userTest.last_name).to.be.equal("borgues");
    expect(userTest.email).to.be.equal("marito.borgues@mail.com");
    expect(userTest.password).to.not.be.equal("123456");
  });

  it("[Auth] /auth/login - Should login a user", async () => {
    const data = {
      email: "marito.borgues@mail.com",
      password: "123456",
    };

    const { status, body, headers } = await request
      .post("/auth/login")
      .send(data);

    // Verifica status y body
    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(body.message).to.be.equal("Login successful");

    // Verifica que NO haya token en el body
    expect(body.token).to.be.undefined;

    // Verifica la cookie
    const cookies = headers["set-cookie"];
    expect(cookies).to.be.an("array");
    const tokenCookie = cookies.find((c) => c.startsWith("token="));
    expect(tokenCookie).to.include("HttpOnly");
  });

  it("[User|Find] /user/:id - Should find user by Id", async () => {
    const { status, body } = await request.get(`/user/${userTest._id}`);
    const findedUser = body.payload;

    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(findedUser.first_name).to.be.equal("marito");
    expect(findedUser.last_name).to.be.equal("borgues");
    expect(findedUser.email).to.be.equal("marito.borgues@mail.com");
    expect(findedUser.password).to.not.be.equal("123456");
    expect(findedUser.role).to.be.equal("user");
    expect(findedUser.pets).to.be.an("array");
  });

  it("[User|Delete] /user/:id - Should delete user by Id", async () => {
    const { status, body } = await request.delete(`/user/${userTest._id}`);
    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(body.payload).to.be.equal("User deleted");
  });
});
