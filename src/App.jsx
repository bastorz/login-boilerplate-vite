import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "../components/views/loginPage";
import SignUpPage from "../components/views/signUpPage";
import HomePage from "../components/views/homePage";
import ResetPasswordPage from "../components/views/resetPassword";
import ResetPasswordSuccessPage from "../components/views/resetPasswordSuccessPage";
import SetNewPassword from "../components/views/setNewPassword";

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
          <Route path="/update-user" element={<SetNewPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
