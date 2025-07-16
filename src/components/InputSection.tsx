import React, { useState } from "react";

interface InputSectionProps {
  handleUrlFetch: (url: string) => void;
}

const InputSection = ({ handleUrlFetch }: InputSectionProps) => {
  const [url, setUrl] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === "NumpadEnter") && url.trim()) {
      handleUrlFetch(url.trim());
      setUrl("");
    }
  };

  const handleButtonClick = () => {
    if (url.trim()) {
      handleUrlFetch(url.trim());
      setUrl("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 !p-4 text-center">
      <input
        className="input input-bordered input-primary w-full flex-1 !px-2 !py-3"
        type="text"
        placeholder="Enter URL to analyze"
        value={url}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-primary w-full sm:w-auto !px-4"
        onClick={handleButtonClick}
      >
        Analyze
      </button>
    </div>
  );
};

export default InputSection;
