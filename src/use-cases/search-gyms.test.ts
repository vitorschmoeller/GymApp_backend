import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./serach-gyms";

let gymsRepository: InMemoryGymRepository;

let sut: SearchGymsUseCase;

describe("Search Gyms Use Case ", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();

    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -7.9703027,
      longitude: -35.0312336,
    });
    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -7.9703027,
      longitude: -35.0312336,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript gym ${i}`,
        description: null,
        phone: null,
        latitude: -7.9703027,
        longitude: -35.0312336,
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript gym 21" }),
      expect.objectContaining({ title: "JavaScript gym 22" }),
    ]);
  });
});
