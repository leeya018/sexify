// utils/addUser.ts
import { User } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import checkUserExists from "./checkUserExists";

const addUser = async (user: User): Promise<void> => {
  if (await checkUserExists(user.uid)) {
    throw new Error("user is allread in the system");
  }
  await setDoc(doc(db, "users", user.uid), {
    userId: user.uid,
    email: user.email,
    name: user.displayName,
    age: 0,
    photoUrl: "",
    location: null,
    gender: "",
    preferences: [],
    bio: "",
  });
};

export default addUser;
