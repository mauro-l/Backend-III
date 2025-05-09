import { expect } from "chai";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.qa", override: true });

const port = process.env.PORT || 8080;
const request = supertest(`http://localhost:${port}/api`); // Cambia la URL según tu configuración

describe("===== TEST PETS =====", () => {
  let petTest;

  before(async () => {
    console.log(
      `🔌 Initializing tests and connecting to the server on port: ${port}...`
    );
  });

  it("Should register a new pet", async () => {
    const newPet = {
      name: "Limon",
      specie: "Gato",
      gender: "Macho",
      birthdate: "2020-12-10",
      image: "hhttddass",
    };

    const { status, body } = await request.post("/pets").send(newPet);
    if (status !== 201) console.error("Error response:", body);

    petTest = body.payload;

    expect(status).to.be.equal(201);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(petTest.name).to.be.equal("limon");
    expect(petTest.specie).to.be.equal("gato");
    expect(petTest.birthdate).to.be.equal("2020-12-10T00:00:00.000Z");
    expect(petTest.image).to.be.an("string");
  });

  it("Should edit a pet", async () => {
    const updatePet = {
      name: "Courage",
      specie: "Perro",
      gender: "Macho",
      birthdate: "2020-12-10",
      image: "hhttddass",
    };

    const { status, body } = await request
      .put(`/pets/${petTest._id}`)
      .send(updatePet);

    petTest = body.payload;

    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(petTest.name).to.be.equal("courage");
    expect(petTest.specie).to.be.equal("perro");
    expect(petTest.birthdate).to.be.equal("2020-12-10T00:00:00.000Z");
    expect(petTest.image).to.be.an("string");
  });

  it("Should get pet by id", async () => {
    const { status, body } = await request.get(`/pets/${petTest._id}`);
    const petById = body.payload;

    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(petById).to.be.an("object");
    expect(petById).to.have.property("_id");
    expect(petById.name).to.not.be.equal("limon");
    expect(petById.specie).to.not.be.equal("gato");
    expect(petById.birthdate).to.be.equal("2020-12-10T00:00:00.000Z");
    expect(petById.image).to.be.an("string");
  });

  it("Should delete a pet", async () => {
    const { status, body } = await request.delete(`/pets/${petTest._id}`);
    if (status !== 200) console.error("Error response:", body);

    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
  });
});
