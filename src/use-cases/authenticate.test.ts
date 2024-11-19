import { expect, describe, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcryptjs from "bcryptjs";
describe("Autenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

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
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "Johndoe@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

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
