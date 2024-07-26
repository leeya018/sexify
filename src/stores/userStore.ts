import { makeAutoObservable } from "mobx";
import { User } from "@/types/User";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, GeoPoint } from "firebase/firestore";

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(userId: string) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        this.user = userDoc.data() as User;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  async updateUser(
    updatedUser: User,
    latitude: number | null,
    longitude: number | null
  ) {
    try {
      const userRef = doc(db, "users", updatedUser.userId);
      const updatedLocation =
        latitude !== null && longitude !== null
          ? new GeoPoint(latitude, longitude)
          : null;
      await updateDoc(userRef, {
        ...updatedUser,
        location: updatedLocation,
      });
      this.user = { ...updatedUser, location: updatedLocation };
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }

  setUser(user: User) {
    this.user = user;
  }
}

const userStore = new UserStore();
export default userStore;
