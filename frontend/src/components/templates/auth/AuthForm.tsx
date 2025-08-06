// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Input from "@/components/templates/auth/Input/Input";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

// import { LuEye, LuEyeClosed } from "react-icons/lu";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// // Strict validation schema
// const schema = z.object({
//   name: z
//     .string()
//     .min(2, "Name must be at least 2 characters")
//     .max(50, "Name must be less than 50 characters")
//     .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces")
//     .optional(),

//   email: z
//     .string()
//     .email("Invalid email format")
//     .max(100, "Email must be less than 100 characters")
//     .regex(emailRegex, { message: "Please enter a valid email address" })
//     .optional(),

//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .max(64, "Password must be less than 64 characters")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[0-9]/, "Password must contain at least one digit")
//     .regex(
//       /[^a-zA-Z0-9]/,
//       "Password must contain at least one special character"
//     )
//     .optional(),
// });

// export type FormData = z.infer<typeof schema>;

// export default function AuthForm({ isLogin }: { isLogin: boolean }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//     mode: "onTouched",
//   });

//   useEffect(() => {
//     if (!isLogin && errors.name && errors.name.message !== "Required") {
//       showErrorToast({
//         title: "Invalid Name",
//         description: errors.name.message || "",
//         actionLabel: "Button",
//         onAction: () => {
//           // Handle button click
//         },
//       });
//     }

//     if (errors.email && errors.email.message !== "Required") {
//       showErrorToast({
//         title: "Invalid Email",
//         description: errors.email.message || "",
//         actionLabel: "Button",
//         onAction: () => {
//           // Handle button click
//         },
//       });
//     }

//     if (errors.password && errors.password.message !== "Required") {
//       showErrorToast({
//         title: "Invalid Password",
//         description: errors.password.message || "",
//         actionLabel: "Button",
//         onAction: () => {
//           // Handle button click
//         },
//       });
//     }
//   }, [errors, isLogin]);

//   const onSubmit = (data: FormData) => {
//     const { name, email, password } = data;

//     if ((!isLogin && !name?.trim()) || !email?.trim() || !password?.trim()) {
//       showErrorToast({
//         title: "Empty Field(s)",
//         description: "None of the fields can be empty",
//         actionLabel: "OK",
//         onAction: () => {},
//       });
//       return;
//     }

//     console.log("Form submitted:", data);
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-sm space-y-3 text-fontFamily-roboto"
//       >
//         {!isLogin && (
//           <Input
//             name="name"
//             labelName="Name"
//             type="text"
//             register={register}
//             // error={errors.name}
//           />
//         )}

//         <Input
//           name="email"
//           labelName="Email"
//           type="email"
//           register={register}
//           // error={errors.email}
//         />

//         <Input
//           name="password"
//           labelName="Password"
//           type={showPassword ? "text" : "password"}
//           register={register}
//           // error={errors.password}
//           icon2={<LuEye className="w-4 h-4" />}
//           icon1={<LuEyeClosed className="w-4 h-4" />}
//           toggle={() => setShowPassword((prev) => !prev)}
//         />
//         {isLogin ? (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-center gap-2">
//               <input
//                 type="checkbox"
//                 aria-label="Remember Me"
//                 className="w-4 h-4 accent-secondary-500"
//               />
//               <span className="text-sm font-medium text-black-50">
//                 Remember Me
//               </span>
//             </div>
//             <Link
//               href="/forgot-password"
//               className="text-sm text-primary-600 font-medium hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//         ) : (
//           <div className="flex items-center text-sm gap-2">
//             <input
//               type="checkbox"
//               aria-label="Terms & Privacy"
//               className="w-4 h-4 accent-secondary-500"
//             />
//             <span className="text-black-50">
//               I agree to the Terms & Privacy
//             </span>
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full h-11 bg-primary-200 text-white font-semibold rounded-lg hover:bg-primary-400 transition"
//         >
//           {isLogin ? "Login" : "Sign up"}
//         </button>
//       </form>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/templates/auth/Input/Input";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Schema بدون optional چون اعتبارسنجی خالی بودن رو خودمون هندل می‌کنیم
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

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleCustomSubmit = async () => {
    const { name, email, password } = getValues();

    // بررسی خالی بودن فیلدها
    if (
      (!isLogin && !name?.trim()) ||
      !email?.trim() ||
      !password?.trim()
    ) {
      showErrorToast({
        title: "Incomplete Form",
        description: "Please fill out all fields before continuing",
        actionLabel: "OK",
        onAction: () => {},
      });
      return;
    }

    // اعتبارسنجی با schema
    const isValid = await trigger();
    if (!isValid) return;

    console.log("Form submitted:", { name, email, password });
  };

  useEffect(() => {
    if (!isLogin && errors.name) {
      showErrorToast({
        title: "Invalid Name",
        description: errors.name.message || "",
        actionLabel: "Button",
        onAction: () => {},
      });
    }

    if (errors.email) {
      showErrorToast({
        title: "Invalid Email",
        description: errors.email.message || "",
        actionLabel: "Button",
        onAction: () => {},
      });
    }

    if (errors.password) {
      showErrorToast({
        title: "Invalid Password",
        description: errors.password.message || "",
        actionLabel: "Button",
        onAction: () => {},
      });
    }
  }, [errors, isLogin]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCustomSubmit();
      }}
      className="w-full max-w-sm space-y-3 text-fontFamily-roboto"
    >
      {!isLogin && (
        <Input
          name="name"
          labelName="Name"
          type="text"
          register={register}
        />
      )}

      <Input
        name="email"
        labelName="Email"
        type="email"
        register={register}
      />

      <Input
        name="password"
        labelName="Password"
        type={showPassword ? "text" : "password"}
        register={register}
        icon2={<LuEye className="w-4 h-4" />}
        icon1={<LuEyeClosed className="w-4 h-4" />}
        toggle={() => setShowPassword((prev) => !prev)}
      />

      {isLogin ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              aria-label="Terms & Privacy"
              className="w-4 h-4 accent-secondary-500"
            />
            <span className="text-sm font-medium text-black-50">
              Remember Me
            </span>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-600 font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      ) : (
        <div className="flex items-center text-sm gap-2">
          <input
            type="checkbox"
            aria-label="Terms & Privacy"
            className="w-4 h-4 accent-secondary-500"
          />
          <span className="text-black-50">
            I agree to the Terms & Privacy
          </span>
        </div>
      )}

      <button
        type="submit"
        className="w-full h-11 bg-primary-200 text-white font-semibold rounded-lg hover:bg-primary-400 transition"
      >
        {isLogin ? "Login" : "Sign up"}
      </button>
    </form>
  );
}
