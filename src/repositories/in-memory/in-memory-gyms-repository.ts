import { Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((currencyItem) => {
      return currencyItem.id === id;
    });

    if (!gym) {
      return null;
    }

    return gym;
  }
}
