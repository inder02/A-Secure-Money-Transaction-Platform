import React from "react";

const InputBox = ({ label, onChange, placeholder }) => {
  return (
    <div className="flex flex-col pt-1 pb-4 gap-2">
      <div className="text-left">{label}</div>
      <div>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className="w-full border border-slate-200 rounded-md px-2"
        />
      </div>
    </div>
  );
};

export default InputBox;
