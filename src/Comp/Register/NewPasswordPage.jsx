import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InPage from "./InPage";

const NewPass = ({ login, user, isUser }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nav = useNavigate();
  useEffect(() => {
    if (user) nav("/dashboard");
  });

  const handleNewPassword = (e) => {
    e.preventDefault();

    //Check empty inputs and toasting
    if (!password && !confirmPassword) {
      toast.error("Password and Confirm Password should not be empty!");
    } else if (!password === confirmPassword) {
      toast.error(
        "Passowrd and Confirm Password doesn't MATCH, Ensure they are same!"
      );
    } else {
      //try Update Password
      const body = { password: password, email: isUser.email };
      try {
        axios
          .post("http://localhost:3030/newpassword", body)
          .then((res) => {
            toast.success(
              `Password updated successfully for User: ${isUser.name.toUpperCase()}. Now Login to enjoy Chatting!!`,
              {
                positon: "top-right",
                autoClose: 5000,
              }
            );

            login();
          })
          .catch((res) => {
            if (res.status === "404" || "401")
              toast.error(res.response?.data?.message);
            else
              toast.error(
                "Sorry, Server is in Maintenance!! We will look into it ASAP."
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
      style={{ marginTop: "-4.5rem" }}
    >
      <div className="row   justify-content-center">
        <div
          className="col-lg-5 col-xl-4 col-md-7 col-sm-9 d-flex flex-column justify-content-center"
          style={{ padding: "0" }}
        >
          <div className="header-inner text-center ">
            <div
              style={{ marginBottom: "3rem" }}
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
              <h4 className="">Chatvia</h4>
            </div>
            <div>
              <h4 className="m-1">New Password </h4>
              <p style={{ color: "lightslategrey", marginBottom: "4rem" }}>
                Add New Password to Chatvia.
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
            <form className="" onSubmit={handleNewPassword}>
              <InPage
                {...{
                  type: "password",
                  placeholder: "Enter New Password",
                  name: "password",
                  value: password,
                  label: "New Password",
                  icon: <i class="ri-lock-password-line"></i>,
                }}
                onChange={(e) => setPassword(e)}
              />
              <InPage
                {...{
                  type: "password",
                  name: "confirmpassword",
                  value: confirmPassword,
                  placeholder: "Enter Confirm Password",
                  label: "Confirm Password",
                  icon: <i class="ri-lock-password-line"></i>,
                }}
                onChange={(e) => setConfirmPassword(e)}
              />

              <input
                type="submit"
                value={"Update Password"}
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
          <div className="d-flex flex-column justify-content-between text-center mt-5">
            <p>
              Don't want to Update?{" "}
              <button
                onClick={() => login()}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#7269ef",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                SignIn
              </button>
            </p>
            <p>
              © 2024 Chatvia. Crafted with{" "}
              <i class="ri-heart-fill" style={{ color: "red" }}></i> by Akhila
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPass;
