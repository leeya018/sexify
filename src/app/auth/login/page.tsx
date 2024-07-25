// components/Login.tsx
"use client";
import React from "react";
import { auth, googleProvider } from "@/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import messageStore from "@/stores/messageStore";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import Message from "@/components/Message";

const Login: React.FC = () => {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);

      messageStore.setSuccessMessage("Login successful!");
      router.push("/");
      // You can add additional logic here after login
    } catch (error) {
      messageStore.setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login with Google
        </button>
      </div>
      <div className="">
        <Message />
      </div>
    </div>
  );
};

export default observer(Login);
