import { ApplyValues } from "@/models/apply";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export async function applyCard(applyValues: ApplyValues) {
  return await addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues);
}

export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string;
  userId: string;
  applyValues: Partial<ApplyValues>;
}) {
  const docQuery = query(
    collection(store, COLLECTIONS.CARD_APPLY),
    where("userId", "==", userId),
    where("cardId", "==", cardId)
  );

  const snapshot = await getDocs(docQuery);
  const [applied] = snapshot.docs;

  await updateDoc(applied.ref, applyValues);
}

export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string;
  cardId: string;
}) {
  const docQuery = query(
    collection(store, COLLECTIONS.CARD_APPLY),
    where("userId", "==", userId),
    where("cardId", "==", cardId)
  );

  const snapshot = await getDocs(docQuery);

  if (snapshot.docs.length === 0) {
    return null;
  }

  const [applied] = snapshot.docs;
  return applied.data() as ApplyValues;
}
