import React from "react";

type Props = {};

const ChatQueryInput = (props: Props) => {
  return (
    <div className="absolute w-full bottom-0 left-0 px-4 md:px-6 pb-6 pt-0.5 bg-white">
      <div className="max-w-3xl mx-auto">
        <div
          className="relative border-2 ring ring-slate-100 rounded-lg bg-white 
              focus-within:ring-blue-100 focus-within:border-blue-300"
        >
          <div className="relative w-full">
            <textarea
              placeholder="Ask Cody"
              className="w-full max-h-52 px-4 pt-3 pb-0 bg-transparent resize-none 
                          rounded-lg border-0 focus:outline-none focus:ring-0"
              style={{ height: "36px" }}
            ></textarea>
            <div className="invisible text-red-400 text-xs text-right px-3 font-medium">
              2080 characters left{" "}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="relative inline-block text-left -ml-2">
                <div>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-headlessui-state=""
                    aria-label="Conversation options"
                    className="inline-flex border hover:bg-slate-100 px-2 py-1.5 
                                  rounded-md group"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 transition group-active:rotate-90"
                    >
                      <path
                        d="M160 256C160 202.1 202.1 160 256 160C309 
                                      160 352 202.1 352 256C352 309 309 352 256 352C202.1 352
                                      160 309 160 256zM256 208C229.5 208 208 229.5 208
                                       256C208 282.5 229.5 304 256 304C282.5 304 304 282.5
                                       304 256C304 229.5 282.5 208 256 208zM293.1 .0003C315.3
                                       .0003 334.6 15.19 339.8 36.74L347.6 69.21C356.1 73.36
                                       364.2 78.07 371.9 83.28L404 73.83C425.3 67.56 448.1 76.67
                                       459.2 95.87L496.3 160.1C507.3 179.3 503.8 203.6 487.8
                                       218.9L463.5 241.1C463.8 246.6 464 251.3 464 256C464
                                       260.7 463.8 265.4 463.5 270L487.8 293.1C503.8 308.4
                                       507.3 332.7 496.3 351.9L459.2 416.1C448.1 435.3 425.3
                                       444.4 404 438.2L371.9 428.7C364.2 433.9 356.1 438.6
                                       347.6 442.8L339.8 475.3C334.6 496.8 315.3 512 293.1
                                       512H218.9C196.7 512 177.4 496.8 172.2 475.3L164.4
                                       442.8C155.9 438.6 147.8 433.9 140.1 428.7L107.1
                                       438.2C86.73 444.4 63.94 435.3 52.85 416.1L15.75
                                       351.9C4.66 332.7 8.168 308.4 24.23 293.1L48.47
                                       270C48.16 265.4 48 260.7 48 255.1C48 251.3
                                       48.16 246.6 48.47 241.1L24.23 218.9C8.167
                                       203.6 4.66 179.3 15.75 160.1L52.85 95.87C63.94
                                       76.67 86.73 67.56 107.1 73.83L140.1 83.28C147.8
                                       78.07 155.9 73.36 164.4 69.21L172.2 36.74C177.4
                                       15.18 196.7 0 218.9 0L293.1 .0003zM205.5 103.6L194.3
                                       108.3C181.6 113.6 169.8 120.5 159.1 128.7L149.4
                                        136.1L94.42 119.9L57.31 184.1L98.81 223.6L97.28 235.6C96.44
                                        242.3 96 249.1 96 256C96 262.9 96.44 269.7 97.28
                                        276.4L98.81 288.4L57.32 327.9L94.42 392.1L149.4
                                        375.9L159.1 383.3C169.8 391.5 181.6 398.4 194.3
                                        403.7L205.5 408.4L218.9 464H293.1L306.5 408.4L317.7
                                         403.7C330.4 398.4 342.2 391.5 352.9 383.3L362.6
                                         375.9L417.6 392.1L454.7 327.9L413.2 288.4L414.7
                                         276.4C415.6 269.7 416 262.9 416 256C416 249.1
                                         415.6 242.3 414.7 235.6L413.2 223.6L454.7
                                          184.1L417.6 119.9L362.6 136.1L352.9 128.7C342.2
                                          120.5 330.4 113.6 317.7 108.3L306.5 103.6L293.1
                                          48H218.9L205.5 103.6z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center border rounded-md">
                <button
                  className="flex items-center gap-2 text-sm px-2 
                              py-1 rounded-l-md hover:bg-slate-100"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 95.82 76.19"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                  >
                    <path
                      d="M78.27,2.13h0a129.38,129.38,0,0,0-46.76,0c-1.32.24-19.44,6.65-19.44,6.65h0A18,18,0,0,0,0,25.77v12A18,18,0,0,0,10.82,54.2l44.07,22V59.77a130.25,130.25,0,0,0,23.38-2.12h0A21.42,21.42,0,0,0,95.82,36.58V23.19A21.42,21.42,0,0,0,78.27,2.13Z"
                      fill="#2a48df"
                    ></path>
                    <path
                      d="M54.89,50.76a121.11,121.11,0,0,1-21.75-2A12.4,12.4,0,0,1,23,36.58V23.19A12.39,12.39,0,0,1,33.14,11a120.45,120.45,0,0,1,43.5,0A12.39,12.39,0,0,1,86.8,23.19V36.58a12.4,12.4,0,0,1-10.16,12.2A121.11,121.11,0,0,1,54.89,50.76Z"
                      fill="#fff"
                    ></path>
                    <path
                      d="M41.31,38.86a3.75,3.75,0,0,1-3.75-3.75V24.67a3.76,3.76,0,1,1,7.51,0V35.11A3.75,3.75,0,0,1,41.31,38.86Z"
                      fill="#6d93f6"
                    ></path>
                    <path
                      d="M68.41,38.86a3.75,3.75,0,0,1-3.76-3.75V24.67a3.76,3.76,0,1,1,7.51,0V35.11A3.75,3.75,0,0,1,68.41,38.86Z"
                      fill="#6d93f6"
                    ></path>
                  </svg>
                  <span className="line-clamp-1">Factual Cody</span>
                </button>
                <button className="border-l rounded-r-md py-2 px-3 hover:bg-slate-100">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                  >
                    <path
                      fill="currentColor"
                      d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3
                                           19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2
                                           37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2
                                           27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                aria-label="start speech recognition"
                className="px-2 py-1 rounded-md text-slate-400 hover:bg-slate-200
                               hidden lg:inline-block"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 384 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96
                                   96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24
                                    10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24
                                     24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7
                                     152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128
                                      128s-128-57.3-128-128V216z"
                  ></path>
                </svg>
              </button>
              <button
                className="-mr-2 inline-flex items-center font-medium gap-2 px-2 py-1.5
                           rounded-md disabled:bg-blue-100 disabled:text-blue-400 hover:disabled:text-blue-400
                            cursor-not-allowed text-slate-400"
                aria-label="Send message"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M49.9 27.8C15.1 12.7-19.2 50.1-1.2 83.5L68.1 212.2c4.4 8.3 12.6 13.8 21.9 
                                      15c0 0 0 0 0 0l176 22c3.4 .4 6 3.3 6 6.7s-2.6 6.3-6 6.7l-176 22s0 0 0 0c-9.3
                                       1.2-17.5 6.8-21.9 15L-1.2 428.5c-18 33.4 16.3 70.8 51.1 55.7L491.8 292.7c32.1-13.9
                                        32.1-59.5 0-73.4L49.9 27.8z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatQueryInput;
