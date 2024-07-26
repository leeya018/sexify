// utils/sampleUsers.ts
import { User } from "@/types/User";
import { GeoPoint } from "firebase/firestore";

const sampleUsers: User[] = [
  {
    userId: "1",
    email: "user1@example.com",
    name: "User One",
    age: 25,
    photoUrl: "https://example.com/photo1.jpg",
    location: new GeoPoint(32.0853, 34.7818), // Tel Aviv
    gender: "male",
    preferences: ["sports", "movies"],
    bio: "I love sports and movies.",
  },
  {
    userId: "2",
    email: "user2@example.com",
    name: "User Two",
    age: 30,
    photoUrl: "https://example.com/photo2.jpg",
    location: new GeoPoint(31.7683, 35.2137), // Jerusalem
    gender: "female",
    preferences: ["music", "travel"],
    bio: "I enjoy traveling and listening to music.",
  },
  // Add more users as needed
  {
    userId: "3",
    email: "user3@example.com",
    name: "User Three",
    age: 28,
    photoUrl: "https://example.com/photo3.jpg",
    location: new GeoPoint(32.794, 34.9896), // Haifa
    gender: "male",
    preferences: ["reading", "technology"],
    bio: "I'm passionate about reading and technology.",
  },
  // ... add more users here ...
  {
    userId: "20",
    email: "user20@example.com",
    name: "User Twenty",
    age: 27,
    photoUrl: "https://example.com/photo20.jpg",
    location: new GeoPoint(32.0853, 34.7818), // Tel Aviv
    gender: "female",
    preferences: ["sports", "art"],
    bio: "I enjoy sports and art.",
  },
];

export default sampleUsers;
