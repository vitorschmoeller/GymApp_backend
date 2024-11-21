import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcryptjs from "bcryptjs";

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe("Autenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    // sut = system under test
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Johndoe",
      email: "Johndoe@example.com",
      password_hash: await bcryptjs.hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "Johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "Johndoe@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Johndoe",
      email: "Johndoe@example.com",
      password_hash: await bcryptjs.hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "Johndoe@example.com",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
