import Fastify from "fastify";
import cors from "@fastify/cors";
import { cart } from './cart.js';
import { body } from './body.js';
import { inquiry } from './inquiry.js';
import { review } from './review.js';

const fastify = Fastify();

const initApp = async () => {
  await fastify.register(cors);
  cart(fastify);
  body(fastify);
  inquiry(fastify);
  review(fastify);
};

try {
  await initApp();
  await fastify.listen({ port: 3001 });
  console.log("Listen 3001!");
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
