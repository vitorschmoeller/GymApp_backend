import bcrypt from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUSeCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUSeCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    // const prismaUserRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
