import { fakerES as faker } from "@faker-js/faker";
import { createHash } from "../common/utils/hashPassword.ts";
import type { IUser } from "../modules/users/user.interface.ts";

export const generateUserMock = (amount: number): IUser[] => {
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
