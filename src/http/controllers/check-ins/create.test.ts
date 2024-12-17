import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { prisma } from "../../../lib/prisma";
import { app } from "@/app";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";
describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -7.9703027,
        longitude: -35.0312336,
      },
    });
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -7.9703027,
        longitude: -35.0312336,
      });

    expect(response.statusCode).toEqual(201);
  });
});
