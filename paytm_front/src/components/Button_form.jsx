import React from "react";

const Button_form = ({ label, onClick }) => {
  return (
    <div>
      <button
        className="w-full text-white bg-gray-600 hover:bg-gray-950 rounded-md p-1 mt-2 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button_form;
