import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import bcryptjs from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found";
let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Johndoe",
      email: "Johndoe@example.com",
      password_hash: await bcryptjs.hash("123456", 6),
    });

    const { user } = await sut.execute({ userId: createdUser.id });
    console.log(user.name);
    // expect any String(Espera qualquer coisa que seja string)
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Johndoe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    expect(() => sut.execute({ userId: "non-exist" })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
