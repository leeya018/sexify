"use client";
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, GeoPoint } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import messageStore from "@/stores/messageStore";
import { User } from "@/types/User";
import { observer } from "mobx-react-lite";
import updateUser from "@/utils/updateUser";
import Message from "@/components/Message";
import getUser from "@/utils/getUser";

const EditProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUser("ORBiqhINocRWsmvE3sXfyJdZLpC3")
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => {
        messageStore.setErrorMessage(err.message);
      });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const updatedLocation =
          user.location && user.location.latitude && user.location.longitude
            ? new GeoPoint(user.location.latitude, user.location.longitude)
            : null;
        const updatedUser = await updateUser(user, updatedLocation);
        setUser(updatedUser); // Update the local state with the new user data
        messageStore.setSuccessMessage("Profile updated successfully!");
      } catch (error) {
        messageStore.setErrorMessage(error.message);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setUser((prevUser) => (prevUser ? { ...prevUser, [id]: value } : null));
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser((prevUser) =>
      prevUser
        ? { ...prevUser, preferences: value.split(",").map((p) => p.trim()) }
        : null
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        {user ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={user.name}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                value={user.age ?? ""}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="photoUrl"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                value={user.photoUrl}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="latitude"
              >
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                value={user.location ? user.location.latitude : ""}
                onChange={(e) =>
                  setUser((prevUser) =>
                    prevUser
                      ? {
                          ...prevUser,
                          location: new GeoPoint(
                            parseFloat(e.target.value),
                            prevUser.location ? prevUser.location.longitude : 0
                          ),
                        }
                      : null
                  )
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="longitude"
              >
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                value={user.location ? user.location.longitude : ""}
                onChange={(e) =>
                  setUser((prevUser) =>
                    prevUser
                      ? {
                          ...prevUser,
                          location: new GeoPoint(
                            prevUser.location ? prevUser.location.latitude : 0,
                            parseFloat(e.target.value)
                          ),
                        }
                      : null
                  )
                }
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                value={user.gender}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="preferences"
              >
                Preferences (comma-separated)
              </label>
              <input
                type="text"
                id="preferences"
                value={user.preferences.join(", ")}
                onChange={handlePreferencesChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={user.bio}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Profile
              </button>
            </div>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="">
        <Message />
      </div>
    </div>
  );
};

export default observer(EditProfile);
