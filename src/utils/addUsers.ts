import { getFirestore, doc, setDoc } from "firebase/firestore";
import sampleUsers from "./sampleUsers";
import { User } from "@/types/User";
import { db } from "@/firebaseConfig";

const addUsers = async (users: User[]) => {
  try {
    const promises = users.map((user) => {
      const userRef = doc(db, "users", user.userId);
      return setDoc(userRef, user);
    });

    await Promise.all(promises);
    console.log("All users added successfully!");
  } catch (error) {
    console.error("Error adding users: ", error);
    throw error;
  }
};

export default addUsers;
