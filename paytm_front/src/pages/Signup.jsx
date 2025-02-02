import React from "react";
import { Heading } from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";

import BottomWarning from "../components/BottomWarning";
import Button_form from "../components/Button_form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center ">
      usernaem
      {username}
      <div className="bg-white  p-8 w-[25rem] rounded-lg items-center text-center justify-center">
        <Heading label={"Sign Up"} />
        <Subheading
          label={
            "Create an account to get started with world's best platform !"
          }
        />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          label={"First Name"}
          placeholder={"Enter your first name"}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          label={"Last Name"}
          placeholder={"Enter your last Name"}
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"Enter your Email"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"Enter your password"}
        />
        <Button_form
          onclick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/signup",
              {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
          label={"Sign Up"}
        />
        <BottomWarning
          label={"Already have an account?"}
          to={"/signin"}
          buttontext={"Sign In"}
        />
      </div>
    </div>
  );
};
