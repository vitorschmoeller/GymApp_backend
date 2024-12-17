import { expect, it, describe, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-numbers-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymRepository;
let sut: CheckInUseCase;

describe("Check in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);
    // Avisa o vitest para utilizar o mocked time
    vi.useFakeTimers();

    await gymsRepository.create({
      id: "gym-01",
      title: "Javascript gym",
      description: "",
      phone: "",
      latitude: -7.9703027,
      longitude: -35.0312336,
    });
  });

  afterEach(() => {
    // Ajusta a data a cada test rodado
    vi.useRealTimers();
  });
  it("should be able create check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.9703027,
      userLongitude: -35.0312336,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // TDD test driven development RED, Green, Refactor

  it("should not be able to check in twice in the same day", async () => {
    // setando a data do teste
    vi.setSystemTime(new Date(2024, 10, 21, 14, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.9703027,
      userLongitude: -35.0312336,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -7.9703027,
        userLongitude: -35.0312336,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  // latitude and longitude
  // -7.8917151,-35.0500605

  it("should be able to check in twice but in different days", async () => {
    // setando a data do teste
    vi.setSystemTime(new Date(2024, 10, 21, 14, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.9703027,
      userLongitude: -35.0312336,
    });

    vi.setSystemTime(new Date(2024, 10, 22, 14, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.9703027,
      userLongitude: -35.0312336,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-2",
      title: "Javascript gym",
      description: "",
      phone: "",
      latitude: new Decimal(-7.9703027),
      longitude: new Decimal(-35.0500605),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-2",
        userId: "user-01",
        userLatitude: -7.8917151,
        userLongitude: -35.0312336,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
