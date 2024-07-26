import {
  getFirestore,
  GeoPoint,
  collection,
  getDocs,
  query,
  where,
  DocumentSnapshot,
  startAfter,
  limit,
} from "firebase/firestore";
import { User } from "@/types/User"; // Adjust the path to your User type
import { db } from "@/firebaseConfig";

// Haversine formula to calculate distance between two points in kilometers
const haversineDistance = (
  coords1: { latitude: number; longitude: number },
  coords2: { latitude: number; longitude: number }
) => {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const R = 6371; // Radius of the Earth in kilometers
  return R * c;
};

const getUsers = async (
  lastDoc: DocumentSnapshot | null,
  batchSize: number = 2,
  userId: string,
  userLocation: GeoPoint,
  radius: number
): Promise<{ users: User[]; lastVisible: DocumentSnapshot | null }> => {
  const usersCollection = collection(db, "users");
  let q;
  if (lastDoc) {
    q = query(
      usersCollection,
      where("userId", "!=", userId),
      startAfter(lastDoc),
      limit(batchSize)
    );
  } else {
    q = query(usersCollection, where("userId", "!=", userId), limit(batchSize));
  }

  const querySnapshot = await getDocs(q);

  const fetchedUsers: User[] = [];
  querySnapshot.forEach((doc) => {
    const user = doc.data() as User;
    if (user.location) {
      const distance = haversineDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: user.location.latitude, longitude: user.location.longitude }
      );
      if (distance <= radius) {
        fetchedUsers.push(user);
      }
    }
  });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    users: fetchedUsers,
    lastVisible: querySnapshot.docs.length === batchSize ? lastVisible : null,
  };
};

export default getUsers;
