import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetUserMetricUseCase } from "@/use-cases/factories/make-get-user-metric-use-case";

export async function metrics(request: FastifyRequest, response: FastifyReply) {
  const fetchUserCheckInsHistoryUseCase = makeGetUserMetricUseCase();

  const { checkInsCount } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
  });

  return response.status(200).send({ checkInsCount });
}
