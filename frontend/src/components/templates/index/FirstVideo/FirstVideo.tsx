import Image from "next/image";
import StartFirsQuizButton from "../StartFirsQuizButton";

export default function FirstVideo() {

  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center gap-6 font-roboto">
        {/* Text Section */}
        <div className="w-full text-center flex flex-col items-center justify-center text-blackNew-50 dark:text-white">
          <h2 className="text-xl md:text-4xl font-medium mb-4">Title</h2>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas
            purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris
            rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed
            euismod nisi porta lorem mollis.
          </p>
          <StartFirsQuizButton />
        </div>
        {/* Left video or Placeholder */}
        <div className="w-full h-[500px] rounded-2xl bg-secondary-50 dark:bg-secondary-600 aspect-[4/3] md:aspect-[16/9] relative overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center text-blackNew-50 text-xl">
            video
          </span>
        </div>
      </div>
    </section>
  );
}
