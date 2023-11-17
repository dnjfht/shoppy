import { getFirestore } from './db.js';

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {void}
 */
export const body = async (fastify) => {
  fastify.post("/body/:userId", async (request, reply) => {
    const userId = request.params["userId"];
    const data = request.body["data"];

    const firestore = await getFirestore();

    const docRef = firestore.collection("body").doc(userId);
    await docRef.set(data);
    return "OK!";
  });

  fastify.get("/body/:userId", async (request, reply) => {
    const userId = request.params["userId"];

    const firestore = await getFirestore();

    const docRef = firestore.collection("body").doc(userId);
    const doc = await docRef.get();
    return doc.data();
  });
}
