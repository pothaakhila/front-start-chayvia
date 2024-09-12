import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import InPage from "./InPage";
import { useNavigate } from "react-router-dom";
import NewPasswordPage from "./NewPasswordPage";

const Forgot = ({ login, user }) => {
  const [isUser, setIsUser] = useState(false);
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    if (user) nav("/dashboard");
  });

  const handleEmail = (e) => {
    e.preventDefault();

    //Check empty inputs and toasting
    if (!email) {
      toast.error("Email should not be empty!", {
        position: "top-right",
      });
    } else {
      //try Checking Email
      const body = { email: email };
      try {
        axios
          .post("http://localhost:3030/forgotpassword", body)
          .then((res) => {
            toast.success(
              `Email exists, Now enter New Password to update for User: ${res.data.name.toUpperCase()}`,
              {
                positon: "top-right",
                autoClose: 5000,
              }
            );

            setIsUser(res.data);
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
    <>
      {isUser ? (
        <NewPasswordPage login={login} isUser={isUser} />
      ) : (
        <div
          className="container"
          style={{
            marginTop: "-6rem",
          }}
        >
          <div className="row   justify-content-center">
            <div
              className="col-lg-5 col-xl-4 col-md-7 col-sm-9 d-flex flex-column"
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
                  <h4 className="">Chatvia</h4>
                </div>
                <div>
                  <h4 className="m-1">Reset Password </h4>
                  <p style={{ color: "lightslategrey", marginBottom: "4rem" }}>
                    Reset Password with Chatvia.
                  </p>
                </div>
              </div>
              <div
                className=" d-flex flex-column "
                style={{
                  backgroundColor: "#fff",
                  padding: "2rem 1.5rem",
                  marginTop: "-2.5rem",
                }}
              >
                <form className="" onSubmit={handleEmail}>
                  <div
                    className="text-center p-2 my-3"
                    style={{ backgroundColor: "#cdf7ec", borderRadius: "5px" }}
                  >
                    Enter your Registered Email and then You will be able to
                    update your Password!
                  </div>
                  <InPage
                    {...{
                      type: "text",
                      placeholder: "Enter Email",
                      name: "email",
                      value: email,
                      label: "Email",
                      icon: <i class="ri-mail-line"></i>,
                    }}
                    onChange={(e) => setEmail(e)}
                  />
                  <input
                    type="submit"
                    value={"Reset"}
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
                  Remember It?{" "}
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
                  <i class="ri-heart-fill" style={{ color: "red" }}></i> by
                  Akhila
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Forgot;
