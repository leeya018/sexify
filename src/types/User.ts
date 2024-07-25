// types/User.ts

import { GeoPoint } from "firebase/firestore";

export interface User {
  userId: string;
  email: string;
  name: string;
  age: number | null;
  photoUrl: string;
  location: GeoPoint | null;
  gender: string;
  preferences: string[];
  bio: string;
}
