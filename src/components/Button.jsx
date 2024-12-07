import React from "react";

const Button = ({ id, title, leftIcon, rightIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}  transition-transform active:translate-y-1`}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase ">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
