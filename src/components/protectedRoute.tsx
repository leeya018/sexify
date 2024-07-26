"use client";
import React, { FC, useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import userStore from "@/stores/userStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = observer(({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setIsAuthenticated(true);
        userStore.fetchUser(user.uid);
      } else {
        userStore.setUser(null);
        router.push("/auth/login");
      }
      setIsLoading(false);
    });

    return () => unSub();
  }, []);

  if (isLoading) {
    return <div>Loading ....</div>;
  }
  return isAuthenticated ? <div>{children}</div> : null;
});
export default ProtectedRoute;
