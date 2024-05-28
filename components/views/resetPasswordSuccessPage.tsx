import React from "react";

const resetPasswordSuccessPage = () => {
  return (
    <section className="bg-white dark:bg-gray-900 items-center justify-center h-screen ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-5xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Check your email to recover your password.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            We have sent you an email with a link so you can set a new password.
          </p>
          <a
            href="/"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to home page
          </a>
        </div>
      </div>
    </section>
  );
};
export default resetPasswordSuccessPage;
