"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setError(null);
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setError(null);
    } catch (error) {
      setError("Failed to sign in with Google.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (error) {
      setError("Failed to sign out.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center w-full max-w-md space-y-6">
        <a href="/" className="underline hover:bg-gray-600 self-start">
          ⬅ back
        </a>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Login
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
              <div className="relative w-full">
                <input
                  className="p-3 pr-10 mt-1 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-none resize-none custom-scrollbar focus:outline-none w-full"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{
                    display: "block",
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 text-gray-700 dark:text-gray-300"
                  style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
                >
                  {showPassword ? (
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
              <div className="text-end">
                <a
                  href="forgotpassord"
                  className="text-gray-300 ml-2 underline hover:bg-gray-100 hover:text-gray-800"
                >
                  {" "}
                  forgot password ?{" "}
                </a>
              </div>
            </div>
            {/* https://developers.google.com/identity/branding-guidelines?hl=fr */}
            <button
              onClick={handleSignIn}
              className="text-gray-900 dark:text-gray-800 text-left bg-gray-300 rounded-lg hover:bg-gray-100 px-3 py-2 w-full text-center"
            >
              Sign In →
            </button>
            <div className="my-4 text-center">
              Dosen't have an account ?
              <a
                href="register"
                className="text-gray-300 ml-2 underline hover:bg-gray-100 hover:text-gray-800 "
              >
                Register
              </a>
            </div>
            <hr />
            <div className="flex justify-center">
              <button
                className="gsi-material-button px-3 py-2 mt-4 w-full "
                onClick={handleGoogleSignIn}
              >
                <div className="gsi-material-button-state "></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg
                      version="1.1"
                      viewBox="0 0 48 48"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">
                    Sign in with Google
                  </span>
                  <span style={{ display: "none" }}>Sign in with Google</span>
                </div>
              </button>
            </div>
            <style jsx>{`
              .gsi-material-button {
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -webkit-appearance: none;
                background-color: WHITE;
                background-image: none;
                border: 1px solid #747775;
                -webkit-border-radius: 4px;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: #1f1f1f;
                cursor: pointer;
                font-family: "Roboto", arial, sans-serif;
                font-size: 14px;
                height: 40px;
                letter-spacing: 0.25px;
                outline: none;
                overflow: hidden;
                padding: 0 12px;
                position: relative;
                text-align: center;
                -webkit-transition: background-color 0.218s, border-color 0.218s,
                  box-shadow 0.218s;
                transition: background-color 0.218s, border-color 0.218s,
                  box-shadow 0.218s;
                vertical-align: middle;
                white-space: nowrap;
                width: auto;
                max-width: 400px;
                min-width: min-content;
              }

              .gsi-material-button .gsi-material-button-icon {
                height: 20px;
                margin-right: 12px;
                min-width: 20px;
                width: 20px;
              }

              .gsi-material-button .gsi-material-button-content-wrapper {
                -webkit-align-items: center;
                align-items: center;
                display: flex;
                -webkit-flex-direction: row;
                flex-direction: row;
                -webkit-flex-wrap: nowrap;
                flex-wrap: nowrap;
                height: 100%;
                justify-content: space-between;
                position: relative;
                width: 100%;
              }

              .gsi-material-button .gsi-material-button-contents {
                -webkit-flex-grow: 1;
                flex-grow: 1;
                font-family: "Roboto", arial, sans-serif;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: top;
              }

              .gsi-material-button .gsi-material-button-state {
                -webkit-transition: opacity 0.218s;
                transition: opacity 0.218s;
                bottom: 0;
                left: 0;
                opacity: 0;
                position: absolute;
                right: 0;
                top: 0;
              }

              .gsi-material-button:disabled {
                cursor: default;
                background-color: #ffffff61;
                border-color: #1f1f1f1f;
              }

              .gsi-material-button:disabled .gsi-material-button-contents {
                opacity: 38%;
              }

              .gsi-material-button:disabled .gsi-material-button-icon {
                opacity: 38%;
              }

              .gsi-material-button:not(:disabled):active
                .gsi-material-button-state,
              .gsi-material-button:not(:disabled):focus
                .gsi-material-button-state {
                background-color: #303030;
                opacity: 12%;
              }

              .gsi-material-button:not(:disabled):hover {
                -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
                  0 1px 3px 1px rgba(60, 64, 67, 0.15);
                box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
                  0 1px 3px 1px rgba(60, 64, 67, 0.15);
              }

              .gsi-material-button:not(:disabled):hover
                .gsi-material-button-state {
                background-color: #303030;
                opacity: 8%;
              }
            `}</style>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        ) : (
          <div>
            <p>Welcome, {user.email}!</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
}
