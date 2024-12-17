import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { history } from "./history";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/metrics", metrics);
  // query parameters
  // http://exemplo.com/check-ins/history?page=2
  app.get("/check-ins/history", history);
  // route params
  // http://exemplo.com/gyms/123/check-ins
  app.post("/gyms/:gymId/check-ins", create);

  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate,
  );
}
