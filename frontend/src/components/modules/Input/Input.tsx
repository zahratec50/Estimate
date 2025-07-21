"use client";
import React, { useState } from "react";


export default function Input( props: any ) {
  const [isFocus, setIsFocus] = useState(false);
  const [isOpenEyeIcon, setIsOpenEyeIcon] = useState(false);
  

  const openEye = () => {
    setIsOpenEyeIcon((prev) => !prev);
  };

  return (
    <>
      {props.icon1 ? (
        <div className="w-80 sm:w-[350px] md:w-95 h-15">
          <label className="block text-sm font-medium text-black-50 mb-1">
            {props.labelName}
          </label>
          <div
            className={`w-full h-10 flex items-center p-2 border rounded-lg ${
              isFocus ? "ring-1 ring-primary-500" : ""
            } ${props.error ? "border-red-500" : "border-gray-300"}`}
          >
            <input
              type={isOpenEyeIcon ? 'text' : props.type}
              {...props.register(props.type)}
              className={`w-full h-4 p-2 outline-none `}
              placeholder={`Enter your ${props.type}`}
              onFocus={() => setIsFocus(true)}
            />
            <div onClick={openEye}>
              {isOpenEyeIcon ? (
                props.icon1
              ) : (
                props.icon2
              )}
            </div>
          </div>

          {props.password && (
            <p className="text-red-500 text-xs mt-1">
              {props.error.message}
            </p>
          )}
        </div>
      ) : (
        <div
          className={`w-80 sm:w-[350px] md:w-95 h-15 ${
            props.error && "mb-3"
          }`}
        >
          <label className="block text-sm font-medium text-black-50 mb-1">
            {props.labelName}
          </label>
          <input
            type={props.type}
            {...props.register(props.type)}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
              props.error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={`Enter your ${props.type}`}
          />
          {props.error && (
            <p className="text-red-500 text-xs pt-1">{props.error.message}</p>
          )}
        </div>
      )}
    </>
  );
}
