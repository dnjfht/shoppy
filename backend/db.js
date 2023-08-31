import { readFile } from "fs/promises";
import { initializeApp, cert } from "firebase-admin/app";
import * as Firestore from "firebase-admin/firestore";

/** @type {Firestore.Firestore | null} */
let db = null;

const init = async () => {
  const firebaseServiceAccount = JSON.parse(
    await readFile("./service_account.json")
  );
  initializeApp({ credential: cert(firebaseServiceAccount) });
  db = Firestore.getFirestore();
};

export const getFirestore = async () => {
  if (db == null) {
    await init();
  }
  return db;
}
