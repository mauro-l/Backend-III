import { fakerES as faker } from "@faker-js/faker";
import { createHash } from "../common/utils/hashPassword.ts";
import type { IUserSchema } from "../modules/users/user.schema.ts";

export const generateUserMock = (amount: number): IUserSchema[] => {
  const users = [];

  for (let i = 0; i < amount; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: createHash("123456"),
    };

    users.push(user);
  }

  return users;
};
