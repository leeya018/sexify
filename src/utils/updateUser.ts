// utils/addUser.ts
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import checkUserExists from "./checkUserExists";
import { User } from "@/types/User";

const updateUser = async (user: User, location: any): Promise<User> => {
  const userRef = doc(db, "users", user.userId);

  await updateDoc(doc(db, "users", user.userId), {
    name: user.name,
    age: user.age,
    photoUrl: user.photoUrl,
    location,
    gender: user.gender,
    preferences: user.preferences,
    bio: user.bio,
  });

  const updatedUserDoc = await getDoc(userRef);
  if (updatedUserDoc.exists()) {
    return updatedUserDoc.data() as User;
  } else {
    throw new Error("Failed to retrieve updated user data.");
  }
};

export default updateUser;
