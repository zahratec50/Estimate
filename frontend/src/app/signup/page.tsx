import React from "react";
import SigninOrSignupForm from "@/components/modules/SigninOrSignupForm/SigninOrSignupForm"
import Form from "@/components/templates/Form/Form";

export default function signup() {
  return (
    <div>
      <SigninOrSignupForm
        title="Let's get you in Estiper"
        registerOrLogin="Login Now"
        isAccount="Have an account?"
      >
        <Form name="Sign up" checkInput="I agree to the Terms & Priavcy" />
      </SigninOrSignupForm>
    </div>
  );
}
