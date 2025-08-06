import VerificationPage from "@/components/templates/VerificationCode/VerificationCode";
import React from "react";

export default function ResendCode() {
  return (
    <div>
      <VerificationPage resendCode={true} />
    </div>
  );
}
