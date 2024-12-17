import { SearchGymsUseCase } from "../serach-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
