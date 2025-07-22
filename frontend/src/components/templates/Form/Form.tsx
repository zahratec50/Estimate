"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Input from "@/components/modules/Input/Input";

import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Minimum of 6 characters" }),
  name: z.string().min(2, { message: "Minimum of 2 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function Form(prop: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  type FormData = z.infer<typeof schema>;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center "
      >
        {prop.name === "Login" ? (
          <>
            <Input
              labelName="Email"
              type="email"
              error={errors.email}
              register={register}
            />

            <Input
              labelName="Password"
              type="password"
              icon1={<LuEye className="w-4 h-4" />}
              icon2={<LuEyeClosed className="w-4 h-4" />}
              error={errors.password}
              register={register}
            />
          </>
        ) : (
          <>
            <Input
              labelName="Name"
              type="name"
              error={errors.name}
              register={register}
            />
            <Input
              labelName="Email"
              type="email"
              error={errors.email}
              register={register}
            />
            <Input
              labelName="Password"
              type="password"
              icon1={<LuEye className="w-4 h-4" />}
              icon2={<LuEyeClosed className="w-4 h-4" />}
              error={errors.password}
              register={register}
            />
          </>
        )}

        {/* Remember me & Forgot password */}
        <div
          className={`flex ${
            prop.name === "Login"
              ? "items-center justify-evenly"
              : "items-start pl-[36px] sm:pl-[20px] md:pl-[100px]"
          } space-x-6 text-sm w-[390px] h-10 md:w-145 md:h-11`}
        >
          <label className="text-sm flex items-center gap-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-secondary-500 rounded-sm"
            />
            {prop.checkInput}
          </label>
          {prop.name === "Login" && (
            <Link href="/" className="text-lg text-primary-600 hover:underline">
              Forgot password
            </Link>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-80 sm:w-[350px] md:w-95 h-11 bg-primary-200 text-white py-2 rounded-lg hover:bg-primary-600 transition"
        >
          {prop.name}
        </button>
      </form>
    </div>
  );
}
