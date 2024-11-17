import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistError } from "./errors/user-already-exists-error";

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    // const prismaUserRepository = new PrismaUsersRepository();

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
