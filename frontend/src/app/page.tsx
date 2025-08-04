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

import feature from "@/data/feature.json"

export default function HomePage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 space-y-5 pb-5 px-4 lg:px-0">
        <Header />

        <FirstVideo />
        <Features />
        {/* <YourQuestions /> */}
        <Question question={feature[0].question} answer={feature[0].answer} id={feature[0].id} />
        <Question question={feature[1].question} answer={feature[1].answer} id={feature[1].id} />
        <Question question={feature[2].question} answer={feature[2].answer} id={feature[2].id} />
        <Question question={feature[3].question} answer={feature[3].answer} id={feature[3].id} />
        {/* <Description /> */}
        <Start />
        <Footer />
      </div>
    </div>
  );
}
