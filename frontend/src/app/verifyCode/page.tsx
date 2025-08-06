import VerificationPage from "@/components/templates/VerificationCode/VerificationCode";
import React from "react";

export default function verifyCode() {
  return (
    <div>
      <VerificationPage resendCode={false} />
    </div>
  );
}
