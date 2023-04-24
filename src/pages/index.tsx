import { Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Tabs } from "@/components/Tabs";
import { useState } from "react";
import { IconSettings } from "tabler-icons";

const outfit = Outfit({ subsets: ["latin"] });

export type typeOfTime = "pomodoro" | "shortBreak" | "longBreak";

const tabs = [
  { id: "pomodoro", label: "Pomodoro" },
  { id: "shortBreak", label: "Short Break" },
  { id: "longBreak", label: "Long Break" },
];

const initalTimePomodoro: Record<typeOfTime, number> = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
};

export default function Home() {
  const [timePomodoro, setTimePomodoro] = useState(initalTimePomodoro.pomodoro);
  const [start, setStart] = useState(false);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start pt-24 ${outfit.className} `}
    >
      <Tabs
        className="mb-8 mt-4 w-full  max-w-screen-lg items-center justify-center"
        tabs={tabs}
        customActiveTab={(id) =>
          setTimePomodoro(initalTimePomodoro[id as typeOfTime])
        }
      />
      <Header />

      <div className="flex flex-col md:flex-row items-center rounded-md justify-center w-full bg-slate-50 p-4 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700/50 max-w-screen-lg relative gap-4">
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-center w-full h-36 md:h-48 bg-slate-200/50 dark:bg-slate-700/40 rounded mb-4">
            <h2 className="font-bold text-5xl md:text-7xl ">
              {timePomodoro}:00
            </h2>
          </div>

          <button
            onClick={() => setStart((prev) => !prev)}
            className="flex h-12 w-full bg-black dark:bg-white text-white dark:text-black text-xl font-semibold rounded-md justify-center items-center active:scale-[0.97] transition-transform"
          >
            {start ? "Stop" : "Start"}
          </button>
        </div>
        <div className="flex flex-col   w-1/2 min-h-[14rem]  border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50 px-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl ">Task</h2>
            <button className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-800 active:scale-95 transition-transform">
              <IconSettings size={24} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
