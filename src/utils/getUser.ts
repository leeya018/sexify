// utils/checkUserExists.ts
import { User } from "@/types/User";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const getUser = async (userId: string): Promise<User> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("user is not in the system");
  }
  return userSnap.data() as User;
};

export default getUser;
