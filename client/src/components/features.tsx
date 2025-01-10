import { Button } from "./ui/button";
import { MouseEventHandler, RefAttributes } from "preact/compat";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Checkbox } from "./ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Trash2Icon } from "lucide-react";

type NavIcon = {
  Icon?: RefAttributes<SVGSVGElement>;
  Content?: string;
  EventHandler: MouseEventHandler<HTMLButtonElement>;
};

const NavbarIcon = ({ Icon, Content, EventHandler }: NavIcon) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false); // For smooth closing animations

  const handleOpen = () => {
    setIsClosing(false); // Cancel any closing animations
    setIsOpen(true); // Open the tooltip
  };

  const handleClose = () => {
    setIsClosing(true); // Start closing animation
    setTimeout(() => setIsOpen(false), 800); // Delay actual closing
  };

  return (
    <TooltipProvider delayDuration={2000}>
      <Tooltip
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)} // Manage tooltip state
      >
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            aria-label="Icon Button"
            className="cursor-pointer"
            onMouseEnter={handleOpen} // Open on hover
            onMouseLeave={handleClose} // Close with timeout
            onClick={EventHandler}
          >
            {Icon}
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          align="center"
          onMouseEnter={handleOpen} // Keep open when hovering content
          onMouseLeave={handleClose} // Close with timeout
          className={`bg-black text-white rounded px-2 py-1 shadow-lg transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <p>{Content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type Task = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
};

type taskType = {
  task: Task;
  id: string;
  deleteHandler: (id: string) => Promise<void>;

  updateHandler: (id: string) => Promise<void>;
};

const TaskList = ({ task, id, deleteHandler, updateHandler }: taskType) => {
  const updatedDate = new Date(task.updatedAt);
  const today = new Date();

  // Check if the updated date is the same as today
  const isSameDay =
    updatedDate.getDate() === today.getDate() &&
    updatedDate.getMonth() === today.getMonth() &&
    updatedDate.getFullYear() === today.getFullYear();

  // Format the date
  const formattedDate = isSameDay
    ? new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  return (
    <div className="flex flex-col border border-primary w-full p-4 gap-4">
      {/* Left Section */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col flex-grow gap-2">
          <h1 className="text-lg font-bold">{task.title}</h1>
          <h2 className="text-sm text-gray-600 overflow-hidden">
            {task.description}
          </h2>
        </div>

        {/* Checkbox */}
        <div className="flex flex-col justify-center items-center gap-0.5 mt-2">
          <Checkbox
            onClick={() => updateHandler(id)}
            checked={task.isCompleted}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <Trash2Icon size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogDescription>Are You Sure To Delete?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost" onClick={() => deleteHandler(id)}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-row justify-between">
        <h3 className="text-sm text-gray-500">
          Created At: {formattedDate.format(new Date(task.createdAt))}
        </h3>
        <h3 className="text-sm text-gray-500">
          {task.isCompleted
            ? `Completed At: ${formattedDate.format(new Date(task.updatedAt))}`
            : ""}
        </h3>
      </div>
    </div>
  );
};

export { NavbarIcon, TaskList };
