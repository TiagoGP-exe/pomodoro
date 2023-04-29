import { Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Tabs } from "@/components/Tabs";
import { useEffect, useMemo, useState } from "react";
import { IconSettings } from "tabler-icons";
import { Task } from "@/components/Task";
import Head from "next/head";
import { minorOfTen } from "@/utils/minorOfTen";

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
  const transformNumbersInMinutes = (number: number) => {
    const minutes = Math.floor(number / 60);
    const seconds = number % 60;
    return `${minorOfTen(minutes)}:${minorOfTen(seconds)}`;
  };
  const [timeActual, setTimeActual] = useState(timePomodoro * 60);

  useMemo(() => {
    setTimeActual(timePomodoro * 60);
  }, [timePomodoro]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTimeActual((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start]);

  const [task, setTask] = useState([""]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start pt-24 ${outfit.className} px-2`}
    >
      <Head>
        <title>Pomodoro</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Tabs
        className="mb-8 mt-4 w-full  max-w-screen-lg items-center justify-center"
        tabs={tabs}
        customActiveTab={(id) => {
          setTimePomodoro(initalTimePomodoro[id as typeOfTime]);
          setStart(false);
        }}
      />
      <Header />

      <div className="flex flex-col md:flex-row items-start rounded-md justify-center w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200  dark:border-slate-700/50 p-4  max-w-screen-lg relative gap-4 ">
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-center w-full h-36 md:h-48 bg-slate-200/50 dark:bg-slate-700/40 rounded mb-4">
            <h2 className="font-bold text-5xl md:text-7xl ">
              {transformNumbersInMinutes(timeActual)}
            </h2>
          </div>

          <button
            onClick={() => setStart((prev) => !prev)}
            className="flex h-12 w-full bg-black dark:bg-white text-white dark:text-black text-xl font-semibold rounded-md justify-center items-center  transition-transform active:translate-y-1 "
          >
            {start ? "Stop" : "Start"}
          </button>
        </div>
        <Task />
      </div>
    </main>
  );
}
