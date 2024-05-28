import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import HomePage from "../components/views/homePage";
import LoginPage from "../components/views/loginPage";
import SignUpPage from "../components/views/signUpPage";
import ResetPasswordPage from "../components/views/resetPasswordPage";
import ResetPasswordSuccessPage from "../components/views/resetPasswordSuccessPage";
import UpdateUserPage from "../components/views/updateUserPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route
            path="reset-password/success"
            element={<ResetPasswordSuccessPage />}
          />
          <Route path="/update-user" element={<UpdateUserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
