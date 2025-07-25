import ProgressSegment from "@/components/modules/ProgressBar/ProgressBar";
import QuizPage from "@/components/templates/QuizPage/QuizPage";
import QuizNavigation from "@/components/templates/QuizNavigation/QuizNavigation";


export default function Quiz({ params }: { params: { numberQuiz?: string } }) {
  const step = parseInt(params.numberQuiz?? "", 10);
  

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Progress bar for mobile */}
      <div className="flex sm:hidden justify-center mb-4">
        <ProgressSegment numberPage={step} />
      </div>

      {/* Quiz Content */}
      <div className="flex items-center justify-center">
        <QuizPage currentStep={step} />
      </div>

      {/* Navigation and progress for larger screens */}
      <div className="w-full max-w-[766.99px] flex flex-col items-center justify-center xl:justify-between px-4 sm:px-0 mt-6">
        <hr className="w-full hidden sm:block my-4" />
        <div className="w-full mt-auto flex items-center justify-between sm:gap-4">
          <div className="hidden sm:block">
            <ProgressSegment numberPage={step} />
          </div>
          <QuizNavigation currentPage={step} />
        </div>
      </div>
    </div>
  );
}

