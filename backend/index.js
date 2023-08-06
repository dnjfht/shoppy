import Fastify from "fastify";
import cors from "@fastify/cors";
import { readFile } from "fs/promises";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const fastify = Fastify();

const initApp = async () => {
  await fastify.register(cors);

  const firebaseServiceAccount = JSON.parse(
    await readFile("./service_account.json")
  );
  initializeApp({ credential: cert(firebaseServiceAccount) });
  const db = getFirestore();

  fastify.post("/cart/:userId", async (request, reply) => {
    const userId = request.params["userId"];
    const data = request.body["data"];

    const docRef = db.collection("cart").doc(userId);
    await docRef.set(data);
    return "OK!";
  });

  fastify.get("/cart/:userId", async (request, reply) => {
    const userId = request.params["userId"];

    const docRef = db.collection("cart").doc(userId);
    const doc = await docRef.get();
    return doc.data();
  });
};

try {
  await initApp();
  await fastify.listen({ port: 3001 });
  console.log("Listen 3001!");
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
