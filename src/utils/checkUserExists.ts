// utils/checkUserExists.ts
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const checkUserExists = async (userId: string): Promise<boolean> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  return userSnap.exists();
};

export default checkUserExists;
