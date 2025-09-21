import Header from "@/components/templates/index/Header/Header";
import React from "react";
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
        <div id="features">
          <Features />
        </div>
        <div
          id="questions"
          className="flex flex-col items-center justify-between gap-8 space-y-5 sm:space-y-20"
        >
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
        <Start />
        <Footer />
      </div>
    </div>
  );
}
