import React, { useState } from "react";
import { supabase } from "../../utils/supabase/entities/supabaseClient";
import { useNavigate } from "react-router-dom";

const resetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const origin = window.location.origin;

  const handleConfirmReset = async () => {
    await supabase.auth
      .resetPasswordForEmail(email, {
        redirectTo: `${origin}/update-user`,
      })
      .then((res) => {
        if (res.error) {
          return navigate(
            "/reset-password?message=Could not authenticate user"
          );
        }

        return navigate(
          "/reset-password/success?message=Password reset link has been sent to your email address"
        );
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-full"
            src="/assets/images/logo_devyond_light.webp"
            alt="logo"
          />
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => {
                handleConfirmReset();
              }}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default resetPasswordPage;
