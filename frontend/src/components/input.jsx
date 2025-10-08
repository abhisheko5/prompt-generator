import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';


const InputBox = ({ handleKeyDown, handleClick, value, onChange }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder="Enter your prompt..."
        className={`w-full px-6 py-4 pr-16 rounded-full border transition-all duration-200 text-white placeholder-gray-600 bg-black outline-none ${
          isActive ? "border-gray-600 shadow-lg" : "border-gray-800"
        } hover:border-gray-600 focus:border-gray-600`}
      />
      <button
        onClick={handleClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium text-sm"
      >
        Go
      </button>
    </div>
  );
};

export default InputBox;