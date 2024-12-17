import { PrismaCheckInRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new FetchUserCheckInsHistoryCase(checkInsRepository);

  return useCase;
}
