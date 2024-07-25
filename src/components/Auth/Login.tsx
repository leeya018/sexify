// // components/Login.tsx
// import React from "react";
// import { auth, googleProvider } from "../../firebaseConfig";
// import { signInWithPopup } from "firebase/auth";

// const Login: React.FC = () => {
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       console.log(result.user);
//       // You can add additional logic here after login
//     } catch (error) {
//       console.error("Error during Google login:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
