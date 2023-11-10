import React from "react";

type Props = {};

const Options = (props: Props) => {
  return (
    <div className="h-full w-14 wrapper hidden md:flex">
      <div className="h-full hidden md:flex flex-col space-y-2 p-2 border-l bg-slate-50 w-14">
        <button
          className="items-center gap-1 text-sm p-2 rounded-l-md border rounded-md 
              relative bg-white hover:bg-slate-100"
        >
          <span
            className="bg-slate-100 border-slate-500 absolute h-4 w-4 -top-1 -left-1 
                  border px-1 rounded-lg"
          ></span>
          <svg
            aria-hidden="true"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 
                      16H288V352c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zM288
                      480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0
                      64 28.7 64 64V320v5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3
                      18.7H288z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <button
          className="items-center gap-1 text-sm p-2 rounded-l-md border rounded-md 
              relative bg-white hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 512 512"
            className="h-5 w-5"
          >
            <path
              d="M256 0c13.3 0 24 10.7 24 24V41.3C380.1 52.4 459.6 131.9 470.7 
                      232H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H470.7C459.6 380.1 380.1 459.6
                      280 470.7V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V470.7C131.9 459.6 52.4
                      380.1 41.3 280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H41.3C52.4 131.9 131.9
                      52.4 232 41.3V24c0-13.3 10.7-24 24-24zM89.7 280c10.5 73.6 68.7 131.8 142.3
                      142.3V392c0-13.3 10.7-24 24-24s24 10.7 24 24v30.3c73.6-10.5 131.8-68.7
                      142.3-142.3H392c-13.3 0-24-10.7-24-24s10.7-24 24-24h30.3C411.8 158.4
                      353.6 100.2 280 89.7V120c0 13.3-10.7 24-24 24s-24-10.7-24-24V89.7C158.4
                      100.2 100.2 158.4 89.7 232H120c13.3 0 24 10.7 24 24s-10.7 24-24
                      24H89.7zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
            ></path>
          </svg>
        </button>
        <button className="items-center gap-1 text-sm p-2 rounded-l-md border rounded-md relative bg-white hover:bg-slate-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="h-5 w-5"
          >
            <path
              fill="currentColor"
              d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 
              16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0
               64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM120 
               240H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H120c-13.3 0-24-10.7-24-24s10.7-24 
               24-24zm256 0h80c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24
                24-24zM120 336h80c13.3 0 24 10.7 24 24s-10.7 24-24 24H120c-13.3 0-24-10.7-24-24s10.7-24 
                24-24zm160 0H456c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24
                 24-24z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Options;
