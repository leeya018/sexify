import ProtectedRoute from "@/components/protectedRoute";
import React from "react";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Wellcome to sexify
      </div>
      ;
    </ProtectedRoute>
  );
}
