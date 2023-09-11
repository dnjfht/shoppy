import { getFirestore } from "./db.js";

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @returns {void}
 */
export const review = async (fastify) => {
  fastify.post("/review/:productId/:userId", async (request, reply) => {
    const productId = request.params["productId"];
    const userId = request.params["userId"];
    const data = request.body["data"];

    const firestore = await getFirestore();

    const docRef = firestore.collection(`review_${productId}`).doc(userId);
    await docRef.set(data);
    return "OK!";
  });

  fastify.get("/review/:productId", async (request, reply) => {
    const productId = request.params["productId"];

    const firestore = await getFirestore();

    const docs = [];
    const snapshot = await firestore.collection(`review_${productId}`).get();
    snapshot.docs.map((doc) => {
      const data = doc.data();
      // delete data.content;
      docs.push(data);
    });
    return docs;
  });

  fastify.get("/review/:productId/:userId", async (request, reply) => {
    const productId = request.params["productId"];
    const userId = request.params["userId"];

    const firestore = await getFirestore();

    const docRef = firestore.collection(`review_${productId}`).doc(userId);
    const doc = await docRef.get();
    return doc.data();
  });
};
