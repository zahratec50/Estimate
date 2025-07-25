
import AuthWrapper from "@/components/templates/auth/AuthWrapper";
import AuthForm from "@/components/templates/auth/AuthForm";

export default function SignInPage() {
  return (
    <AuthWrapper title="Welcome Back" slogan="Login to continue" isLogin={true}>
      <AuthForm isLogin={true} />
    </AuthWrapper>
  );
}
