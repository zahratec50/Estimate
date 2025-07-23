"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Input from "@/components/modules/Input/Input";
import { LuEyeClosed, LuEye } from "react-icons/lu";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Strict validation schema
const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),

  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .regex(emailRegex, { message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export type FormData = z.infer<typeof schema>;

export default function Form({
  name,
  checkInput,
}: {
  name: string;
  checkInput: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center"
      >
        {name === "Login" ? (
          <>
            <Input
            name="email"
              type="email"
              labelName="Email"
              error={errors.email}
              register={register}
            />

            <Input
            name="password"
              type="password"
              labelName="Password"
              icon1={<LuEye className="w-4 h-4" />}
              icon2={<LuEyeClosed className="w-4 h-4" />}
              error={errors.password}
              register={register}
            />
          </>
        ) : (
          <>
            <Input
              name="text"
              type="text"
              labelName="Name"
              error={errors.name}
              register={register}
            />
            <Input
              name="email"
              type="email"
              labelName="Email"
              error={errors.email}
              register={register}
            />
            <Input
              name="password"
              type="password"
              labelName="Password"
              register={register}
              error={errors.password}
              icon1={<LuEye className="w-4 h-4" />}
              icon2={<LuEyeClosed className="w-4 h-4" />}
            />
          </>
        )}

        <div
          className={`flex ${
            name === "Login"
              ? "items-center justify-evenly"
              : "items-start pl-[36px] sm:pl-[20px] md:pl-[100px]"
          } space-x-6 text-sm w-[390px] h-10 md:w-145 md:h-11`}
        >
          <label className="text-sm flex items-center gap-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-secondary-500 rounded-sm"
            />
            {checkInput}
          </label>
          {name === "Login" && (
            <Link href="/" className="text-lg text-primary-600 hover:underline">
              Forgot password
            </Link>
          )}
        </div>

        <button
          type="submit"
          className="w-80 sm:w-[350px] md:w-95 h-11 bg-primary-200 text-white py-2 rounded-lg hover:bg-primary-600 transition"
        >
          {name}
        </button>
      </form>
    </div>
  );
}
