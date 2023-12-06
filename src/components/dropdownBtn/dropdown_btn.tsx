"use client";

import React, { useState } from "react";

type DropDownBtnProps = {
  isOpen: boolean;
  selectedOption: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  toggleDropdown: () => void;
};

const DropDownBtn = ({
  isOpen,
  selectedOption,
  onClick,
  toggleDropdown,
}: DropDownBtnProps) => {
  return (
    <div className="relative inline-block text-left me-5">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none "
          onClick={toggleDropdown}
        >
          {selectedOption}
          {/* Icon for the dropdown arrow */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <button
            type="button"
            value={0}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Jan
          </button>
          <button
            type="button"
            value={1}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Feb
          </button>
          <button
            type="button"
            value={2}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Mar
          </button>
          <button
            type="button"
            value={3}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Apr
          </button>
          <button
            type="button"
            value={4}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            May
          </button>
          <button
            type="button"
            value={5}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Jun
          </button>
          <button
            type="button"
            value={6}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Jul
          </button>
          <button
            type="button"
            value={7}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Aug
          </button>
          <button
            type="button"
            value={8}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Sep
          </button>
          <button
            type="button"
            value={9}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Oct
          </button>
          <button
            type="button"
            value={10}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Nov
          </button>
          <button
            type="button"
            value={11}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
          >
            Dec
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownBtn;
