import React, { useState, ChangeEvent } from "react";

type TwoOptionRadioProps = {
  selectedOption: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TwoOptionRadio: React.FC<TwoOptionRadioProps> = ({
  selectedOption,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio h-5 w-5 text-indigo-600"
          value="month"
          checked={selectedOption === "month"}
          onChange={onChange}
        />
        <span className="ml-2 text-gray-700">By Month</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio h-5 w-5 text-indigo-600"
          value="year"
          checked={selectedOption === "year"}
          onChange={onChange}
        />
        <span className="ml-2 text-gray-700">By Year</span>
      </label>
    </div>
  );
};

export default TwoOptionRadio;
