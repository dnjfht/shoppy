import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import firebaseServiceAccount from "./service_account.json";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const fastify = Fastify();

initializeApp({ credential: cert(firebaseServiceAccount) });
const db = getFirestore();

/**
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
fastify.post("/cart/:userId", async (request, reply) => {
  const userId = request.params["userId"];
  const data = JSON.parse(request.body["data"]);

  const docRef = db.collection("cart").doc(userId);
  await docRef.set(data);
  return "OK!";
});

/**
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
fastify.get("/cart/:userId", async (request, reply) => {
  const userId = request.params["userId"];

  const docRef = db.collection("cart").doc(userId);
  const doc = await docRef.get();
  return doc.data();
});

try {
  await fastify.listen({ port: 3001 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
