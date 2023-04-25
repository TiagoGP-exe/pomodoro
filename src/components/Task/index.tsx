import { useForm } from "react-hook-form";
import {
  IconCheck,
  IconCircleCheck,
  IconCirclePlus,
  IconPlus,
  IconSettings,
  IconTrash,
} from "tabler-icons";
import { Input } from "../Input";
import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { STORAGE_NAMES } from "@/constants/storage";

interface TaskProps {}

interface TaskObject {
  id: string;
  task: string;
  completed: boolean;
  createdAt: string;
}

interface TaskForm {
  task: string;
}

export const Task = () => {
  const [tasks, setTasks] = useState<TaskObject[]>([]);
  const { register, watch, reset, handleSubmit } = useForm<TaskForm>();
  const { systemTheme, theme, setTheme } = useTheme();

  const task = watch("task");

  const onSubmit = (data: TaskForm) => {
    console.log(data);
  };

  useEffect(() => {
    const tasks = localStorage.getItem(STORAGE_NAMES.TASKS);

    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const bg = currentTheme == "dark" ? "#94a3b8" : "#6b7280";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2  w-1/2 min-h-[14rem]  border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50 px-4 "
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl ">Task</h2>
        <button className="p-2 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-800 active:scale-95 transition-transform">
          <IconSettings size={18} />
        </button>
      </div>
      <Input
        {...register("task")}
        type="text"
        placeholder="Add a task"
        className={` transition-all duration-300  ${!task && "p-1"}`}
        rightIcon={
          <div
            className={`flex whitespace-nowrap py-2 px-4 bg-slate-200 dark:bg-slate-700 ml-2 rounded-md transition-all duration-200 pointer-events-none ${
              !task && "opacity-0 invisible translate-x-5 scale-75 "
            }`}
          >
            <p className="flex text-xs opacity-70">Press Enter</p>
          </div>
        }
        onKeyDownCapture={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();

            const newTask = {
              id: v4(),
              task: task,
              completed: false,
              createdAt: new Date().toISOString(),
            };

            setTasks((prev) => [...prev, newTask]);

            const json = JSON.stringify([...tasks, newTask]);
            localStorage.setItem(STORAGE_NAMES.TASKS, json);

            reset();
          }
        }}
      />

      <ul className="flex flex-col gap-2 mt-2 max-h-48 overflow-y-scroll">
        {tasks
          ?.sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map(({ id, completed, task }, index) => (
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                type: "spring",
                bounce: 0.25,
                delay: index * 0.1,
              }}
              key={id}
              className="flex items-center justify-between px-2 py-1 rounded-md border border-slate-200  dark:border-slate-700/50 "
            >
              <p
                className={`flex flex-1 text-sm text-gray-500 dark:text-gray-400 break-all transition-all duration-200 ${
                  completed && "line-through opacity-60"
                }`}
              >
                {task}
              </p>
              <div className="flex gap-0.5">
                <button
                  className="p-1 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-800 active:scale-95 transition-transform "
                  type="button"
                  onClick={() => {
                    const newTasks = [...tasks];
                    newTasks[index].completed = !completed;

                    const json = JSON.stringify(newTasks);
                    localStorage.setItem(STORAGE_NAMES.TASKS, json);

                    setTasks(newTasks);
                    reset();
                  }}
                >
                  {completed ? (
                    <IconCircleCheck
                      className="text-slate-50 dark:text-slate-800"
                      fill={bg}
                      stroke={1.5}
                      size={20}
                    />
                  ) : (
                    <IconCircleCheck
                      className="text-gray-500 dark:text-gray-400"
                      stroke={1.5}
                      size={20}
                    />
                  )}
                </button>
                <button
                  className="p-1 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-800 active:scale-95 transition-transform"
                  onClick={() => {
                    const newTasks = tasks.filter((curr) => curr.id !== id);

                    const json = JSON.stringify(newTasks);
                    localStorage.setItem(STORAGE_NAMES.TASKS, json);

                    setTasks(newTasks);
                    // reset();
                  }}
                >
                  <IconTrash stroke={1.5} size={16} />
                </button>
              </div>
            </motion.li>
          ))}
      </ul>
    </form>
  );
};
