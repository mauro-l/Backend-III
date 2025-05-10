import { expect } from "chai";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.qa", override: true });

const port = process.env.PORT || 8080;
const request = supertest(`http://localhost:${port}/api`); // Cambia la URL según tu configuración
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

describe("===== TEST ADOPTION =====", () => {
  //router.post("/",validateSchema(adoptionSchema),adoptionController.createAdoption);
  let petTest;
  let userTest;
  let adoptionPetId;
  let adoptionOwnerId;
  let adoptionTest;

  let pet = {
    status: null,
    response: null,
    payload: null,
  };
  let owner = {
    status: null,
    response: null,
    payload: null,
  };

  before(async () => {
    console.log(
      `🔌 Initializing tests and connecting to the server on port: ${port}...`
    );
    console.log("Createing test user and pet...");
    //create pet
    const resPet = await request.post("/pets").send({
      name: "Felix",
      specie: "Gato",
      birthdate: "2020-01-01",
      gender: "macho",
      image: "https://example.com/felix.jpg",
    });
    if (resPet.status !== 201) console.error("Error response:", resPet.body);
    //create user
    const resUser = await request.post("/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "JohnDoe@mail.com",
      password: "123456",
    });
    //save pet and user
    petTest = resPet.body.payload;
    userTest = resUser.body.payload;
  });

  beforeEach(async () => {
    if (adoptionPetId && adoptionOwnerId !== undefined) {
      console.log("-> ⌛ Updating pet and user data... <-");
      const newPet = await request.get(`/pets/${adoptionPetId}`);
      pet.status = newPet.status;
      pet.response = newPet.body.status;
      pet.payload = newPet.body.payload;

      const newUser = await request.get(`/user/${adoptionOwnerId}`);
      owner.status = newUser.status;
      owner.response = newUser.body.status;
      owner.payload = newUser.body.payload;
    }
  });

  it("Should register a new adoption", async () => {
    const newAdoption = {
      owner: userTest._id,
      pet: petTest._id,
    };

    const { status, body } = await request.post("/adoption").send(newAdoption);
    if (status !== 201) console.error("Error response:", body);

    adoptionTest = body.payload;

    expect(status).to.be.equal(201);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(adoptionTest).to.have.property("owner");
    expect(adoptionTest).to.have.property("pet");
    expect(adoptionTest).to.have.property("_id");
  });

  it("Should retrieve adoption details by ID", async () => {
    const { status, body } = await request.get(`/adoption/${adoptionTest._id}`);
    const adoptionDetails = body.payload;

    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");

    //owner
    expect(adoptionDetails.owner).to.have.property("_id");
    expect(adoptionDetails.owner.first_name).to.be.equal("john");
    expect(adoptionDetails.owner.last_name).to.be.equal("doe");
    expect(adoptionDetails.owner.pets).to.be.an("array");
    expect(adoptionDetails.owner.pets[0]).to.be.equal(petTest._id.toString());

    //pet
    expect(adoptionDetails.pet).to.have.property("_id");
    expect(adoptionDetails.pet.name).to.be.equal("felix");
    expect(adoptionDetails.pet.specie).to.be.equal("gato");

    // Asegurar que el ID de la mascota esté en el array de mascotas del owner:
    expect(adoptionDetails.owner.pets).to.include(petTest._id.toString());

    adoptionPetId = adoptionDetails.pet._id;
    adoptionOwnerId = adoptionDetails.owner._id;
  });

  it("Should verify pet details after adoption", async () => {
    //pet
    expect(pet.status).to.be.equal(200);
    expect(pet.response).to.be.equal("ok");
    expect(pet.payload).to.be.an("object");

    expect(pet.payload.name).to.be.equal("felix");
    expect(pet.payload.specie).to.be.equal("gato");
    expect(pet.payload.gender).to.be.equal("macho");
    expect(pet.payload.adopted).to.be.equal(true);
    expect(pet.payload.owner).to.include(adoptionOwnerId.toString());
  });

  it("Should verify owner details after adoption", async () => {
    //owner
    expect(owner.status).to.be.equal(200);
    expect(owner.response).to.be.equal("ok");
    expect(owner.payload).to.be.an("object");

    expect(owner.payload.first_name).to.be.equal("john");
    expect(owner.payload.last_name).to.be.equal("doe");
    expect(owner.payload.email).to.be.equal("johndoe@mail.com");
    expect(owner.payload.role).to.be.equal("user");
    expect(owner.payload.pets).to.include(adoptionPetId.toString());
  });

  it("Should delete a adoption", async () => {
    const { status, body } = await request.delete(
      `/adoption/${adoptionTest._id}`
    );
    if (status !== 200) console.error("Error response:", body);

    expect(status).to.be.equal(200);
    expect(body).to.be.an("object");
    expect(body.status).to.be.equal("ok");
    expect(body.payload).to.be.equal("Adoption deleted successfully");
  });

  it("Should verify pet details after adoption deletion", async () => {
    //pet
    expect(pet.status).to.be.equal(200);
    expect(pet.response).to.be.equal("ok");
    expect(pet.payload).to.be.an("object");

    expect(pet.payload.name).to.be.equal("felix");
    expect(pet.payload.adopted).to.not.be.equal(true);
    expect(pet.payload.owner).to.be.null;
  });

  it("Should verify user details after adoption deletion", async () => {
    //owner
    expect(owner.status).to.be.equal(200);
    expect(owner.payload).to.be.an("object");
    expect(owner.response).to.be.equal("ok");

    expect(owner.payload.first_name).to.be.equal("john");
    expect(owner.payload.last_name).to.be.equal("doe");
    expect(owner.payload.email).to.be.equal("johndoe@mail.com");
    expect(owner.payload.role).to.not.be.equal("admin");
    expect(owner.payload.pets).to.not.include(adoptionPetId.toString());
  });

  after(async () => {
    console.log("Cleaning up the database...");
    await request.delete(`/user/${userTest._id}`);
    await request.delete(`/pets/${petTest._id}`);
  });
});
