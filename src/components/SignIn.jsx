import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Signing in...');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in!', { id: loadingToast });
      navigate("/dashboard", { replace: true }); // Added replace: true
    } catch (error) {
      toast.error(error.message, { id: loadingToast });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Sending reset email...');
    
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent!', { id: loadingToast });
      setShowForgotPasswordModal(false);
    } catch (error) {
      toast.error(error.message, { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="space-y-4">
            <div className="relative group">
            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3 transition-colors group-hover:text-indigo-500" />
              <input
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
              onClick={() => setShowForgotPasswordModal(true)}
            >
              Forgot your password?
            </button>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-150 ease-in-out hover:scale-[1.02]"
          >
            Sign in
          </button>
          
          <div className="text-center">
            <Link 
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-150"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full m-4 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="relative group">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3 transition-colors group-hover:text-indigo-500" />
                <input
                  type="email"
                  className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150 ease-in-out"
                  onClick={() => setShowForgotPasswordModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 rounded-lg transition duration-150 ease-in-out"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;