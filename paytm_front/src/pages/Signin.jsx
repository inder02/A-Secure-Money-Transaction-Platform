import React from "react";
import { Heading } from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";

import BottomWarning from "../components/BottomWarning";
import Button_form from "../components/Button_form";
export const Signin = () => {
  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center ">
      <div className="bg-white  p-8 w-[25rem] rounded-lg items-center text-center justify-center">
        <Heading label={"Sign In"} />
        <Subheading
          label={
            "Enter Your Email and Password to get started with world's best platform !"
          }
        />
        <InputBox label={"Email"} placeholder={"Enter your Email"} />
        <InputBox label={"Password"} placeholder={"Enter your password"} />
        <Button_form label={"Sign In"} />
        <BottomWarning
          label={"Don't have an account?"}
          to={"/signup"}
          buttontext={"Sign Up"}
        />
      </div>
    </div>
  );
};
