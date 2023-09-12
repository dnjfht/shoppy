import { getFirestore } from "./db.js";

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {void}
 */
export const inquiry = async (fastify) => {
  fastify.post("/inquiry/:productId/:userId", async (request, reply) => {
    const productId = request.params["productId"];
    const userId = request.params["userId"];
    const data = request.body["data"];

    const firestore = await getFirestore();

    const docRef = firestore.collection(`inquiry_${productId}`).doc(userId);
    await docRef.set(data);
    return "OK!";
  });

  fastify.get("/inquiry/:productId", async (request, reply) => {
    const productId = request.params["productId"];

    const firestore = await getFirestore();

    const docs = [];
    const snapshot = await firestore.collection(`inquiry_${productId}`).get();
    snapshot.docs.map((doc) => {
      const data = doc.data();
      // delete data.content;
      docs.push(data);
    });
    return docs;
  });

  fastify.get("/inquiry/:productId/:userId", async (request, reply) => {
    const productId = request.params["productId"];
    const userId = request.params["userId"];

    const firestore = await getFirestore();

    const docRef = firestore.collection(`inquiry_${productId}`).doc(userId);
    const doc = await docRef.get();
    return doc.data();
  });
};
