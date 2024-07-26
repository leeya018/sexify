import React from "react";
import { User } from "@/types/User"; // Adjust the path to your User type
import { observer } from "mobx-react-lite";
import { FcLike } from "react-icons/fc";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

type UserProfileProps = {
  user: User;
  onClick: () => void;
};

const UserProfile: React.FC<UserProfileProps> = ({ user, onClick }) => {
  return (
    <div>
      <div className="flex flex-col bg-white">
        <div className=" p-6 rounded shadow-md w-full max-w-4xl flex flex-col">
          <div className="flex">
            <div className="flex-shrink-0">
              <img
                src={user.photoUrl}
                alt={`${user.name}'s profile`}
                className="rounded-full w-48 h-48 object-cover mx-auto"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <p className="text-gray-700 text-lg mb-4">Age: {user.age}</p>
              <p className="text-gray-700 text-lg mb-4">
                Gender: {user.gender}
              </p>
              <p className="text-gray-700 text-lg mb-4">Bio: {user.bio}</p>
              <p className="text-gray-700 text-lg mb-4">Preferences:</p>
              <ul className="list-disc list-inside text-gray-700 text-lg">
                {user.preferences.map((preference, index) => (
                  <li key={index}>{preference}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-5 px-5">
            <BiDislike
              onClick={onClick}
              size={40}
              className="hover:scale-110 duration-75 text-red-500"
            />
            <BiLike
              onClick={onClick}
              size={40}
              className="hover:scale-110 duration-75 text-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(UserProfile);
