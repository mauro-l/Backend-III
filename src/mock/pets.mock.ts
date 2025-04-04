import { fakerES_MX as faker } from "@faker-js/faker";
import type { IPetSchema } from "../modules/pets/pet.schema.ts";

export const generatePetsMock = (amount: number): IPetSchema[] => {
  const pets = [];

  for (let i = 0; i < amount; i++) {
    const pet = {
      name: faker.person.firstName(),
      specie: faker.helpers.arrayElement([
        "perro",
        "gato",
        "loro",
        "pez",
        "hamster",
        "carpincho",
        "conejo",
      ]),
      birthday: faker.date.past({ years: 5 }),
      image: faker.image.urlLoremFlickr({ category: "animals" }),
    };

    pets.push(pet);
  }

  return pets;
};
