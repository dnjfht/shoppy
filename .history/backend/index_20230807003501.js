import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.route({
  method: "GET",
  url: "/",
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: "world" };
  },
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
