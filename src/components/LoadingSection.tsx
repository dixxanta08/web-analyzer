import Lottie from "lottie-react";
import animationData from "../assets/cat-Mark-loading.json";

const LoadingSection = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <div className="w-32 sm:w-40 md:w-48">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <p className="text-sm sm:text-base font-medium">
        Please wait while we analyze the website.
      </p>
    </div>
  );
};

export default LoadingSection;
