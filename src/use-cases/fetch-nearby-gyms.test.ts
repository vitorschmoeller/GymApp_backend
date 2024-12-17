import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymRepository;

let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case ", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();

    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -7.9703027,
      longitude: -35.0312336,
    });
    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -7.7908999,
      longitude: -34.843992,
    });

    const { gyms } = await sut.execute({
      userLatitute: -7.9703027,
      userLongitude: -35.0312336,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
