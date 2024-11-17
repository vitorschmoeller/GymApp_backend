import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

// implements garante que a classe garanta o que se espera da interface
export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const users = await prisma.user.create({
      data,
    });
    return users;
  }
}
