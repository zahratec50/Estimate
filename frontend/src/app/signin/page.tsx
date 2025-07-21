import React from "react";
import SigninOrSignupForm from "@/components/modules/SigninOrSignupForm/SigninOrSignupForm";
import Form from "@/components/templates/Form/Form";

export default function signin() {
  return (
    <div>
      <SigninOrSignupForm title='Welcome Back to Estiper' registerOrLogin='Register Now' isAccount="Don't have an account?" name='login' >
        <Form name='Login' checkInput='Remember me' />
      </SigninOrSignupForm>
    </div>
  );
}
