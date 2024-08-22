"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const handleRegister = async () => {
    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      );
      setUser(userCredential.user);
      setError(null);
    } catch (error: any) {
      setError(error.message || "Failed to register. Please try again.");
    }
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center w-full max-w-md space-y-6">
        <a href="/" className="underline hover:bg-gray-600 self-start">
          ⬅ back
        </a>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Register
        </h1>
        {!user ? (
          <div className="w-full">
            <div style={{ marginBottom: "1rem" }}>
              <input
                className="p-3 pr-0 mt-1 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "1rem",
                }}
              />
              {/* PASSWORD */}
              <div className="relative w-full">
                <input
                  className="p-3 pr-10 mt-1 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none w-full"
                  type={showPassword1 ? "text" : "password"}
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  placeholder="Password"
                  style={{
                    display: "block",
                    marginBottom: "1rem",
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility1}
                  className="absolute inset-y-0 right-0 px-3 text-gray-700 dark:text-gray-300"
                  style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                >
                  {showPassword1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.12a10.452 10.452 0 011.682-2.172A11.634 11.634 0 0112 3c2.757 0 5.29 1.12 7.34 2.944M20.22 14.831a11.576 11.576 0 01-2.67 3.033c-2.05 1.825-4.583 2.944-7.34 2.944a11.576 11.576 0 01-7.34-2.944A11.733 11.733 0 011.78 12c.154-.432.332-.855.534-1.266M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.878 7.636A11.73 11.73 0 0112 21a11.735 11.735 0 01-7.64-2.828m15.5 2.138L19.714 20M4.285 4.286L3 5.57"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9.75a3 3 0 110 6 3 3 0 010-6zm.222 2.222L7.293 7.293M16.707 16.707L12.222 12.222M12 3c2.757 0 5.29 1.12 7.34 2.944A10.443 10.443 0 0120.985 8M3.015 8a10.443 10.443 0 011.645-2.056C6.71 4.12 9.243 3 12 3zm0 0L3.015 8zm0 0a10.443 10.443 0 01-.182 4.806A10.443 10.443 0 003.015 8zm16.97 8.985l1.04 1.04"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="relative w-full">
                <input
                  className="p-3 pr-10 mt-1 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none w-full"
                  type={showPassword2 ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Password"
                  style={{
                    display: "block",
                    marginBottom: "1rem",
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility2}
                  className="absolute inset-y-0 right-0 px-3 text-gray-700 dark:text-gray-300"
                  style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                >
                  {showPassword2 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.12a10.452 10.452 0 011.682-2.172A11.634 11.634 0 0112 3c2.757 0 5.29 1.12 7.34 2.944M20.22 14.831a11.576 11.576 0 01-2.67 3.033c-2.05 1.825-4.583 2.944-7.34 2.944a11.576 11.576 0 01-7.34-2.944A11.733 11.733 0 011.78 12c.154-.432.332-.855.534-1.266M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.878 7.636A11.73 11.73 0 0112 21a11.735 11.735 0 01-7.64-2.828m15.5 2.138L19.714 20M4.285 4.286L3 5.57"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9.75a3 3 0 110 6 3 3 0 010-6zm.222 2.222L7.293 7.293M16.707 16.707L12.222 12.222M12 3c2.757 0 5.29 1.12 7.34 2.944A10.443 10.443 0 0120.985 8M3.015 8a10.443 10.443 0 011.645-2.056C6.71 4.12 9.243 3 12 3zm0 0L3.015 8zm0 0a10.443 10.443 0 01-.182 4.806A10.443 10.443 0 003.015 8zm16.97 8.985l1.04 1.04"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {/* https://developers.google.com/identity/branding-guidelines?hl=fr */}
            <button
              onClick={handleRegister}
              style={{ marginBottom: "1rem" }}
              className="text-gray-900 dark:text-gray-800 text-left bg-gray-300 rounded-lg hover:bg-gray-100 px-3 py-2 w-full text-center"
            >
              Register →
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="my-4 text-center">
              Already have an account ?
              <a
                href="login"
                className="text-gray-300 ml-2 underline hover:bg-gray-100 hover:text-gray-800 "
              >
                Login
              </a>
            </div>
          </div>
        ) : (
          <div>
            <p>Welcome, {user.email}!</p>
          </div>
        )}
      </div>
    </div>
  );
}
