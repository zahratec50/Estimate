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

import feature from "@/data/feature.json";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center justify-center dark:bg-secondary-900">
      <div className="w-full mb-14 lg:mb-16">
        <Header />
      </div>
      <div className="w-full max-w-6xl flex flex-col gap-8 space-y-10 lg:space-y-20 pb-5 px-4 lg:px-0">
        <FirstVideo />
        <Features />
        {/* <YourQuestions /> */}
        <div className="flex flex-col items-center justify-between space-y-5 sm:space-y-20">
          {feature.sections
            .slice(0, 6)
            .map(({ title, description, id, image, bulletPoints }) => (
              <Question
                  key={id}
                  question={title}
                  answer={description}
                  id={id}
                  image={image}
                  features={bulletPoints}
                />
              ))}
          </div>
      
      {/* <Description /> */}
      <Start />
      <Footer />
      </div>
    </div>
  );
}
