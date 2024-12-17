import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exists-error";
export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "needs to be a email" }),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    const user = await registerUseCase.execute({ email, name, password });
    return response.status(201).send(user);
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return response.status(409).send({ message: err.message });
    }

    throw err;
  }

  return response.status(201).send();
}
