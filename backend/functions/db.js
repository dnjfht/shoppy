import { readFile } from "fs/promises";
import { initializeApp, cert } from "firebase-admin/app";
import * as Firestore from "firebase-admin/firestore";
import service_account from "../service_account.json";

/** @type {Firestore.Firestore | null} */
let db = null;

const init = async () => {
  const firebaseServiceAccount = service_account;
  initializeApp({ credential: cert(firebaseServiceAccount) });
  db = Firestore.getFirestore();
};

export const getFirestore = async () => {
  if (db == null) {
    await init();
  }
  return db;
}
