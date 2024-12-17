import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { prisma } from "../../../lib/prisma";
import { app } from "@/app";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";
describe("Validate Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -7.9703027,
        longitude: -35.0312336,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(response.statusCode).toEqual(204);

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
