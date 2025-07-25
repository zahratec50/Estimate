
import AuthWrapper from "@/components/templates/auth/AuthWrapper";
import AuthForm from "@/components/templates/auth/AuthForm";

export default function SignUpPage() {
  return (
    <AuthWrapper title="Let's get you in Estiper" slogan="Create your account" isLogin={false}>
      <AuthForm isLogin={false} />
    </AuthWrapper>
  );
}
