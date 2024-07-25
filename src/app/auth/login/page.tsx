// components/Login.tsx
"use client";
import React, { useState } from "react";
import { auth, googleProvider } from "@/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import messageStore from "@/stores/messageStore";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import Message from "@/components/Message";
import checkUserExists from "@/utils/checkUserExists";
import Login from "@/components/Auth/Login";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [exists, setExists] = useState<boolean | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginWithUserAndPass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      if (!result.user) throw new Error("cannon cerate a new user ");

      messageStore.setSuccessMessage("Login successful!");
      router.push("/");
    } catch (error) {
      messageStore.setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      if (!result.user) throw new Error("user from login is null");

      const userExists = await checkUserExists(result.user.uid);

      if (!userExists) {
        throw new Error("User is not exist in db");
      }
      messageStore.setSuccessMessage("Login successful!");
      router.push("/");
      // You can add additional logic here after login
    } catch (error) {
      messageStore.setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex justify-between gap-5">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Login with Google
          </button>
          <div className="mt-10">
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLoginWithUserAndPass}
            />
          </div>
          <Link href={"/auth/signup"}>
            <div className="text-blue-500 underline flex justify-center mt-5">
              To Signup
            </div>
          </Link>
        </div>
      </div>
      <div className="">
        <Message />
      </div>
    </div>
  );
};

export default observer(LoginPage);
