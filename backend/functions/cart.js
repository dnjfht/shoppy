import { getFirestore } from './db.js';

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {void}
 */
export const cart = async (fastify) => {
  fastify.post("/cart/:userId", async (request, reply) => {
    const userId = request.params["userId"];
    const data = request.body["data"];

    const firestore = await getFirestore();

    const docRef = firestore.collection("cart").doc(userId);
    await docRef.set(data);
    return "OK!";
  });

  fastify.get("/cart/:userId", async (request, reply) => {
    const userId = request.params["userId"];

    const firestore = await getFirestore();

    const docRef = firestore.collection("cart").doc(userId);
    const doc = await docRef.get();
    return doc.data();
  });
}
