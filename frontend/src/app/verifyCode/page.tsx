import VerificationPage from '@/components/modules/VerificationCode/VerificationCode'
import React from 'react'

export default function verifyCode() {
  return (
    <div>
      <VerificationPage resendCode={false}/>
    </div>
  )
}
