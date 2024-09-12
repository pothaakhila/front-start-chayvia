import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import ForgotPage from "./Comp/Register/ForgotPage";
import SigninPage from "./Comp/Register/SigninPage";
import SignupPage from "./Comp/Register/SignupPage";
import DashboardPage from "./Comp/Layouts/DashboardPage";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState();

  const openSignUpPage = () => {
    setIsLogin(false);
    setIsSignUp(true);
  };

  const openLoginPage = () => {
    setIsLogin(true);
    setIsSignUp(false);
  };

  const forgot = () => {
    setIsLogin(false);
    setIsSignUp(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main
              className="App d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#f7f7ff",
                width: "100vw",
                height: "100vh",
              }}
            >
              {isLogin ? (
                <SigninPage
                  signUp={openSignUpPage}
                  forgot={forgot}
                  user={user}
                  setUser={setUser}
                />
              ) : isSignUp ? (
                <SignupPage login={openLoginPage} />
              ) : (
                <ForgotPage login={openLoginPage} user={user} />
              )}
            </main>
          }
        />
        <Route
          path="/dashboard"
          element={<DashboardPage user={user} setUser={setUser} />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
