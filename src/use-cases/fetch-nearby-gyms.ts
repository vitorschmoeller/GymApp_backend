import { GymsRepository } from "@/repositories/gyms-repository";

import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest {
  userLatitute: number;
  userLongitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitute,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitute,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
