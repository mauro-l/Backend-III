import mongoose from "mongoose";
import { expect } from "chai";
import dotenv from "dotenv";
import { userDao } from "../../src/modules/users/user.dao.ts";

dotenv.config();
const DB_TEST = process.env.DATABASE_TEST || "";

describe("===== TEST USERDAO =====", () => {
  let userTest;

  before(async () => {
    console.log("Connecting to the test database...");
    await mongoose.connect(DB_TEST);
    console.log("Initializing tests in userDao...");
  });

  beforeEach(async () => {
    await userDao.removeMockAll(); // Limpia la colección antes de cada prueba
    const newUser = {
      first_name: "John",
      last_name: "Doe",
      email: "JohnDoe@mail.com",
      password: "123456",
    };
    userTest = await userDao.create(newUser); // Crea un usuario para las pruebas
  });

  it("Should find all users", async () => {
    const users = await userDao.getAll({});

    expect(users).to.be.an("array");
    expect(users.length).to.be.greaterThan(0);
    expect(users[0]).to.have.property("_id");
    expect(users[0]).to.have.property("first_name");
    expect(users[0]).to.have.property("last_name");
    expect(users[0]).to.have.property("email");
    expect(users[0]).to.have.property("password");
    expect(users[0]).to.have.property("role");
    expect(users[0]).to.have.property("pets");

    expect(users[0].first_name).to.be.equal("John");
  });

  it("Should find a user by ID", async () => {
    const user = await userDao.getOne({ _id: userTest._id });

    expect(user).to.be.an("object");
    expect(user).to.have.property("_id");
    expect(user).to.have.property("first_name");
    expect(user).to.have.property("last_name");
    expect(user).to.have.property("email");
    expect(user).to.have.property("password");
    expect(user).to.have.property("role");
    expect(user).to.have.property("pets");

    expect(user.first_name).to.be.equal("John");
  });

  it("Should update a user", async () => {
    const userUpdateData = {
      first_name: "Joe",
      email: "Joe.Doe@mail.com",
    };

    const userUpdate = await userDao.update(userTest._id, userUpdateData);

    expect(userUpdate).to.be.an("object");
    expect(userUpdate).to.have.property("_id");
    expect(userUpdate).to.have.property("first_name");
    expect(userUpdate).to.have.property("last_name");
    expect(userUpdate).to.have.property("email");
    expect(userUpdate).to.have.property("password");
    expect(userUpdate).to.have.property("role");
    expect(userUpdate).to.have.property("pets");

    expect(userUpdate.first_name).to.be.equal("Joe");
    expect(userUpdate.email).to.be.equal("Joe.Doe@mail.com");
  });

  it("Should delete a user", async () => {
    const userDelete = await userDao.remove(userTest._id);
    const userInDb = await userDao.getOne({ _id: userDelete._id });
    expect(userInDb).to.be.null;
  });

  after(async () => {
    await userDao.removeMockAll();
    console.log("Cleaning up the database...");
    console.log("<> Tests in userDao completed. <>");
    mongoose.connection.close();
  });
});
