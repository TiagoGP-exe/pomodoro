import { motion } from "framer-motion";
import { FC, useState } from "react";

interface TabsProps {
  tabs: { id: string; label: string }[];
  className?: string;
  customActiveTab?: (id: string) => void;
}

export const Tabs: FC<TabsProps> = ({ tabs, className, customActiveTab }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={`flex space-x-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            customActiveTab && customActiveTab(tab.id);
          }}
          className={`${
            activeTab === tab.id
              ? "text-white "
              : "dark:hover:text-white/60 dark:text-white text-black hover:text-black/60"
          } relative z-20 rounded-full px-3 py-1.5 text-sm font-medium transition `}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 dark:bg-white bg-black  mix-blend-difference  rounded-md"
              transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
