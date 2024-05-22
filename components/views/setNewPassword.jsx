import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/entities/supabaseClient";
import { useNavigate, useSearchParams } from "react-router-dom";

const UpdateUserPage = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const urlParams = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const paramsToObject = (searchParams) => {
      const params = Array.from(searchParams.entries()).map(([key, value]) => ({
        [key]: value,
      }));
      return Object.assign({}, ...params);
    };

    const params = paramsToObject(urlParams);
    setCode(params.code);
  }, []);

  const resetPassword = async (code) => {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return navigate(
          `/reset-password?message=Unable to reset Password. Link expired!`
        );
      }
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return navigate(
        `/reset-password?message=Unable to reset Password. Try again!`
      );
    }

    navigate(
      `/login?message=Your Password has been reset successfully. Sign in.`
    );
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
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmedPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {error && (
              <p className="text-sm font-light text-red-500">{error}</p>
            )}

            <button
              type="button"
              onClick={() => {
                resetPassword(code);
              }}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default UpdateUserPage;
