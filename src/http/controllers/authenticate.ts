import { FastifyRequest, FastifyReply } from "fastify";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const user = await authenticateUseCase.execute({ email, password });

    return response.status(200).send(user);
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return response.status(403).send({ message: err.message });
    }

    throw err;
  }
}
