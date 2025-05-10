import mongoose from "mongoose";
import { expect } from "chai";
import dotenv from "dotenv";
import { petDao } from "../../src/modules/pets/pet.dao.ts";

dotenv.config({ path: "./.env.qa", override: true });
const DB_TEST = process.env.DATABASE_TEST || "";
console.log(DB_TEST);

describe("===== TEST PETDAO =====", () => {
  let petTest;

  before(async () => {
    console.log("Connecting to the test database...");
    await mongoose.connect(DB_TEST);
    console.log("Initializing tests in petDao...");
  });

  beforeEach(async () => {
    await petDao.removeMockAll(); // Limpia la colección antes de cada prueba
    const newPet = {
      name: "Felix",
      specie: "Gato",
      birthdate: "2020-01-01",
      gender: "macho",
      image: "https://example.com/felix.jpg",
    };
    petTest = await petDao.create(newPet); // Crea un usuario para las pruebas
  });

  it("Should return an array of pets", async () => {
    const pets = await petDao.getAll({});

    expect(pets).to.be.an("array");
    expect(pets.length).to.be.greaterThan(0);

    expect(pets[0].name).to.be.equal("Felix");
  });

  it("Should find a pet by ID", async () => {
    const pet = await petDao.getOneById(petTest._id);

    expect(pet).to.be.an("object");
    expect(pet).to.have.property("_id");
    expect(pet).to.have.property("name");
    expect(pet).to.have.property("specie");
    expect(pet).to.have.property("birthdate");
    expect(pet).to.have.property("image");

    expect(pet.name).to.be.equal("Felix");
  });

  it("Should update a pet", async () => {
    const petUpdateData = {
      name: "Limon",
      image: "https://example.com/limon.jpg",
    };

    const petUpdate = await petDao.update(petTest._id, petUpdateData);

    expect(petUpdate).to.be.an("object");
    expect(petUpdate).to.have.property("_id");
    expect(petUpdate).to.have.property("name");
    expect(petUpdate).to.have.property("specie");
    expect(petUpdate).to.have.property("birthdate");
    expect(petUpdate).to.have.property("image");
    expect(petUpdate.name).to.be.equal("Limon");
  });

  it("Should remove a pet", async () => {
    const petDelete = await petDao.remove(petTest._id);
    const petInDb = await petDao.getOneById(petDelete._id);
    expect(petInDb).to.be.null;
  });

  after(async () => {
    await petDao.removeMockAll();
    console.log("Cleaning up the database...");
    console.log("<> Tests in petDao completed. <>");
    mongoose.connection.close();
  });
});
