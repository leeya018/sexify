"use client";

import React, { useEffect, useState } from "react";

import { GeoFirestore, GeoCollectionReference, GeoQuery } from "geofirestore";
import { auth } from "@/firebaseConfig";
import { User } from "@/types/User";
import ProtectedRoute from "@/components/protectedRoute";
import { observer } from "mobx-react-lite";
import getUsers from "@/utils/getUsers";
import userStore from "@/stores/userStore";
import messageStore from "@/stores/messageStore";
import { GeoPoint } from "firebase/firestore";
import Message from "@/components/Message";
import UserProfile from "@/components/UserProfile";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const SearchPage = () => {
  const [radius, setRadius] = useState<number>(1000); // default radius in kilometers
  const [users, setUsers] = useState<User[]>([]);
  const [userInd, setUserInd] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userStore.user) {
      fetchUsers();
    }
  }, [userStore?.user]);

  const fetchUsers = async () => {
    setIsLoading(true);
    const location = userStore?.user?.location;
    if (!location) throw new Error("location of user not defiend");
    try {
      if (!userStore.user) throw new Error("missing user");
      const fetchedUsers = await getUsers(
        userStore.user.userId,
        location,
        radius
      );
      setUsers(fetchedUsers);
      console.log(JSON.stringify(fetchedUsers, null, 2));

      messageStore.setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      messageStore.setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log({ userInd });
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {/* thebox */}
        <div className="flex flex-col gap-4 h-screen">
          {/* the serach */}
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto mt-10 ">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Search Users
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="radius"
              >
                Search Radius (km)
              </label>
              <input
                type="number"
                id="radius"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={fetchUsers}
              className="bg-blue-500 hover:bg-blue-700 
             w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              search
            </button>
          </div>
          <div>
            {users.length > 0 && userInd < users.length && (
              <div className="flex justify-center gap-3 items-center">
                <UserProfile
                  user={users[userInd]}
                  onClick={() => {
                    setUserInd((prev) => prev + 1);
                  }}
                />
              </div>
            )}
          </div>
          {isLoading && <div>Loading...</div>}
        </div>

        <div>
          <Message />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default observer(SearchPage);
