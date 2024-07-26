"use client";

import Message from "@/components/Message";
import ProtectedRoute from "@/components/protectedRoute";
import messageStore from "@/stores/messageStore";
import addUser from "@/utils/addUser";
import addUsers from "@/utils/addUsers";
import sampleUsers from "@/utils/sampleUsers";
import { observer } from "mobx-react-lite";
import React from "react";

function SettingsPage() {
  const handleClick = async () => {
    try {
      await addUsers(sampleUsers);
      //   await addUsers(sampleUsers);

      messageStore.setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      messageStore.setErrorMessage(error.message);
    }
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* <h1>settings</h1> */}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 
             w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClick}
          >
            add users to db{" "}
          </button>
        </div>

        <div>
          <Message />
        </div>
      </div>
    </ProtectedRoute>
  );
}
export default observer(SettingsPage);
