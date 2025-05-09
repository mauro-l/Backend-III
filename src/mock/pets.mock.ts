import { fakerES_MX as faker } from "@faker-js/faker";
import type { IPet } from "../modules/pets/pet.interface.ts";

export const generatePetsMock = (amount: number): IPet[] => {
  const pets = [];

  for (let i = 0; i < amount; i++) {
    const pet = {
      name: faker.person.firstName().toLowerCase(),
      specie: faker.helpers
        .arrayElement([
          "perro",
          "gato",
          "loro",
          "pez",
          "hamster",
          "carpincho",
          "conejo",
        ])
        .toLowerCase(),
      birthdate: faker.date.past({ years: 5 }),
      image: faker.image.urlLoremFlickr({ category: "animals" }).toLowerCase(),
      gender: faker.helpers.arrayElement(["macho", "hembra"]).toLowerCase(),
    };

    pets.push(pet);
  }

  return pets;
};
