import React, { useEffect, useState } from "react";
import InPage from "./InPage";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ signUp, forgot, setUser, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    if (user) nav("/dashboard");
  });

  const handleLogin = (e) => {
    e.preventDefault();

    //Check empty inputs and toasting
    if (!email && !password) {
      toast.error("Password and email should not be left unfilled!", {
        position: "top-right",
      });
    } else {
      //try login
      const body = { email: email, password: password };
      try {
        axios
          .post("http://localhost:3030/login", body)
          .then((res) => {
            toast.success("Login Successfull! Enjoy Chatting", {
              positon: "top-right",
              autoClose: 1500,
            });

            setUser(res.data);
            nav("/dashboard");
          })
          .catch((res) => {
            if (res.status === "404" || "401")
              toast.error(res.response?.data?.message);
            else
              toast.error(
                "I apologize; server maintenance is ongoing! We'll investigate it right away."
              );
          });
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div
      className="container justify-content-center"
      style={{ marginTop: "-5.5rem" }}
    >
      <div className="row   d-flex justify-content-center">
        <div
          className="col-lg-5 col-xl-4 col-md-7 col-sm-9  d-flex flex-column justify-content-center"
          style={{ padding: "0" }}
        >
          <div className="header-inner text-center ">
            <div
              style={{ marginTop: "5rem" }}
              className="d-flex align-items-center justify-content-center"
            >
              <i
                className="ri-chat-voice-fill"
                style={{
                  color: "#7269ef",
                  fontSize: "1.55rem",
                  marginRight: "0.5rem",
                }}
              ></i>
              <h4 className="">ChatVia</h4>
            </div>
            <div>
              <h4 className="m-1">Sign In </h4>
              <p style={{ color: "lightslategrey", marginBottom: "4rem" }}>
                Sign in to continue to ChatVia.
              </p>
            </div>
          </div>

          <div
            className=" d-flex flex-column "
            style={{
              backgroundColor: "#fff",
              padding: "2.5rem 2rem",
              marginTop: "-2.5rem",
            }}
          >
            <form className="" onSubmit={handleLogin}>
              <InPage
                {...{
                  type: "email",
                  placeholder: "Enter Email",
                  value: email,
                  // onchange: (e) => setEmail(e),
                  name: "email",
                  label: "Username",
                 
                  icon: <i className="ri-mail-line"></i>,
                }}
                onChange={(e) => setEmail(e)}
              
              />
               <div
                  style={{ color: "#7269ef", cursor: "pointer" ,position:'relative',left:'185px',top:'23px'}}
                  onClick={() => forgot()}
                >
                  Forgot Password?
                </div>
              <InPage
                {...{
                  type: "password",
                  name: "password",
                  value: password,

                  placeholder: "Enter Password",
                  label: "Password",
                  icon: <i className="ri-lock-password-line"></i>,
                }}
                onChange={(e) => setPassword(e)}
                style={{ height: "8rem" }}
              />
              <div className="d-flex justify-content-between">
                <label>
                  <input
                    type="checkbox"
                    style={{
                      backgroundColor: "#f7f7ff",
                      marginRight: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                  Remember Me
                </label>
               
              </div>
              <input
                type="submit"
                value={"Sign In"}
                className="form-control "
                style={{
                  backgroundColor: "#7269ef",
                  color: "white",
                  fontWeight: "400",
                  marginTop: "2rem",
                 
                }}
              />
            </form>
          </div>
          <div className="d-flex flex-column justify-content-between text-center mt-2">
            <p>
              Don't have an account ?{" "}
              <button
                onClick={() => signUp()}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#7269ef",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                Signup now
              </button>
            </p>
            <p>
              © 2024 Chatvia. Crafted with{" "}
              <i className="ri-heart-fill" style={{ color: "red" }}></i> by
             Akhila
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
