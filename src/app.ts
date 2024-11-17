import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./http/routes";
import { env } from "./env";
export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ message: "Iternal server error." });
});
