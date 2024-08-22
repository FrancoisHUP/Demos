"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (error) {
      setError("Failed to sign out.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center w-full max-w-md space-y-6">
        <a href="/" className="underline hover:bg-gray-600 self-start">
          ⬅ back
        </a>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Profile
        </h1>
        {user ? (
          <div>
            <p>Welcome, {user.email}!</p>

            <button
              className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600 my-2"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
