import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeSearchGymsUseCase } from "@/use-cases/factories/make-serch-gym-use-case";

export async function search(request: FastifyRequest, response: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  });

  return response.status(200).send({ gyms });
}
