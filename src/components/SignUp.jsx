import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import toast from 'react-hot-toast';
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, CalendarIcon } from '@heroicons/react/24/solid';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be 10 digits!");
      return;
    }

    const loadingToast = toast.loading('Creating your account...');

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(user, {
        displayName: name,
      });

      toast.success('Account created successfully!', { id: loadingToast });
      navigate("/signin");
    } catch (error) {
      toast.error(error.message, { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today and get started
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div className="relative group">
              <UserIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3 transition-colors group-hover:text-indigo-500" />
              <input
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative group">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3 transition-colors group-hover:text-indigo-500" />
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
              <PhoneIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3 transition-colors group-hover:text-indigo-500" />
              <input
                type="tel"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="relative group">
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3 transition-colors group-hover:text-indigo-500" />
              <input
                type="date"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-150 ease-in-out hover:scale-[1.02]"
            >
              Create Account
            </button>
          </div>
          
          <div className="text-center">
            <Link 
              to="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-150"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;