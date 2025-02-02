import { useSearchParams } from "react-router-dom";
import { Heading } from "../components/Heading";
import { useState } from "react";
import axios from "axios";

export const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const [searchparam] = useSearchParams();
  const id = searchparam.get("id");
  const name = searchparam.get("name");
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center ">
      <div className="bg-white  p-8 w-[25rem] rounded-lg  ">
        <Heading label={"Send Money"} />
        <div className="friend flex items-center mx-4 gap-4 mt-8">
          <span className="text-white bg-green-500 h-12 w-12 border rounded-full text-center flex justify-center items-center font-bold ">
            {name[0].toUpperCase()}
          </span>
          <span className="font-semibold text-2xl">{name}</span>
        </div>
        <div className="amt pl-6">
          <h4>Amount[in Rs]</h4>
        </div>
        <div className="w-full border border-slate-200 rounded-md px-2 flex mx-6 my-1.5">
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="text"
            placeholder="Enter the amount"
          />
        </div>
        <div className="w-full flex justify-center pt-3">
          <button
            onClick={async () => {
              console.log("clicked");
              const res = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  amount,
                },
                {
                  headers: {
                    Authorization: "bearer " + localStorage.getItem("token"),
                  },
                }
              );
              if (res.data.msg === "transfer successful") {
                alert("Transfer Successful");
              }
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center items-center"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};
