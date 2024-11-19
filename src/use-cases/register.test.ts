import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import bcryptjs from "bcryptjs";
import { UserAlreadyExistError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Johndoe",
      email: "Johndeoeeee@example.com",
      password: "123456",
    });
    // let test = true;
    // if (!user) {
    //   test = false;
    // }
    // expect(test).toBe(true);

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUserRepository();

    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Johndoe",
      email: "Johndeoeeee@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await bcryptjs.compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with the same email twice", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "Johndoe@example.com";

    await registerUseCase.execute({
      name: "Johndoe",
      email,
      password: "123456",
    });

    // graças ao callback a promise será executada, promise retorna resolve || reject
    // reject espera que o erro seja uma instância do erro quando verificamos se existe uma email igual lá na classe RegisterUseCase
    await expect(
      registerUseCase.execute({
        name: "Johndoe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
});
