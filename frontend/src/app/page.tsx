import Header from "@/components/templates/index/Header/Header";
import React from "react";
import AuthForm from "@/components/templates/auth/AuthForm";
import AuthWrapper from "@/components/templates/auth/AuthWrapper";
import YourQuestions from "@/components/templates/index/YourQuestions/YourQuestions";
import Description from "@/components/templates/index/Description/Description";
import Features from "@/components/templates/index/Features/Features";
import Start from "@/components/templates/index/Start/Start";
import Footer from "@/components/modules/Footer/Footer";
import FirstVideo from "@/components/templates/index/FirstVideo/FirstVideo";
import Question from "@/components/templates/index/Question/Question";

export default function HomePage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-5 space-y-5 pb-5">
        <Header />

        <FirstVideo />
        <YourQuestions />
        <Question />
        <Description />
        <Features />
        <Start />
        <Footer />
      </div>
    </div>
  );
}
