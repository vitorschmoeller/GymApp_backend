import { PrismaCheckInRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
