import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";
describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some Description",
        phone: "1199999999",
        latitude: -7.9703027,
        longitude: -35.0312336,
      });

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some Description",
        phone: "1199999999",
        latitude: -7.7908999,
        longitude: -34.843992,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -7.7908999,
        longitude: -34.843992,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    console.log(response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "TypeScript Gym",
      }),
    ]);
  });
});
