import { motion } from "framer-motion";
import { FC, useMemo, useState } from "react";
import { IconX } from "tabler-icons";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ children, onClose, open, title }) => {
  const [delayedOpen, setDelayedOpen] = useState(open);

  useMemo(() => {
    setDelayedOpen(open);
  }, [open]);

  const closeDelay = () => {
    setDelayedOpen((prev) => !prev);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!open && !delayedOpen) return null;

  return (
    <main
      className={`fixed inset-0 z-20  flex items-center justify-center transition-all  ${
        delayedOpen
          ? "backdrop-blur"
          : "opacity-0 pointer-events-none duration-300"
      }`}
    >
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-10 dark:bg-opacity-50 z-20  flex items-center justify-center transition-all duration-300 px-10 select-none ${
          delayedOpen && "backdrop-blur"
        }`}
        onClick={closeDelay}
      />
      <motion.dialog
        initial={{ translateY: 10, scale: 0 }}
        animate={{
          translateY: delayedOpen ? 0 : 10,
          scale: delayedOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          bounce: 0,
          delay: delayedOpen ? 0 : 0.1,
        }}
        className="flex flex-col items-center justify-center z-50 bg-white dark:bg-slate-800 rounded-md p-4 absolute shadow-2xl w-11/12 max-w-sm  border border-slate-200  dark:border-slate-700/50"
      >
        <div className="flex items-center justify-between w-full border-b pb-3 border-slate-200  dark:border-slate-700/50">
          <h1 className="text-xl font-semibold ">{title}</h1>
          <button
            className="active:scale-95 transition p-1 hover:bg-slate-100 hover:dark:bg-slate-700/50 rounded"
            onClick={closeDelay}
          >
            <IconX size={18} />
          </button>
        </div>
        <div className="w-full mt-5">{children}</div>
      </motion.dialog>
    </main>
  );
};
