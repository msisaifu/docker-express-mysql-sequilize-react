import { useState } from "react";
import Navbar from "./Nav";
import Sidebar from "./Sidebar";

const Board = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
          <div className="flex overflow-x-auto items-start ">
            <div className="bg-slate-200 min-w-[280px] rounded-md mr-3">
              <div className="p-2 cursor-pointer">
                <span>Todo</span>

                <div className="mt-2 flex flex-col gap-2">
                  <div className="bg-white rounded-md w-full">
                    <div className="p-2 cursor-pointer">
                      <span>Add a new list</span>
                    </div>
                  </div>
                  <div
                    className="bg-white"
                    style={{
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  >
                    <div className="p-2 cursor-pointer">
                      <span>Add a new list</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {[...Array(6)].map((_, index) => (
              <div
                className="bg-slate-200"
                key={index}
                style={{
                  flex: "0 0 auto",
                  minWidth: "280px",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                <div className="p-2 cursor-pointer">
                  <span>Add a new list</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
