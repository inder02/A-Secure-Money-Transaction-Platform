import React from "react";
import { Link } from "react-router-dom";

export default function BottomWarning({ label, buttontext, to }) {
  return (
    <div className="py-2 text-sm flex gap-1 justify-center items-center">
      <div>{label}</div>
      <Link
        className="pointer underline cursor-pointer text-lg font-semibold"
        to={to}
      >
        {buttontext}
      </Link>
    </div>
  );
}
