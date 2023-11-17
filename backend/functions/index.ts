import { FastifyInstance, FastifyServerOptions } from 'fastify'
import cors from "@fastify/cors";
import { cart } from './cart';
import { body } from './body';
import { inquiry } from './inquiry';
import { review } from './review';

export default async function (instance: FastifyInstance, opts: FastifyServerOptions, done) {
    await instance.register(cors);
    cart(instance);
    body(instance);
    inquiry(instance);
    review(instance);

    done();
}
