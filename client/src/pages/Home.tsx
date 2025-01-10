import { TaskList } from "@/components/features";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Context, server } from "@/main";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import axios from "axios";
import { useContext, useEffect, useState } from "preact/hooks";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
const Home = () => {
  const [value, setValue] = useState("All");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated, setLoading } = useContext(Context);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      setLoading(false);
    }
  };
  const deleteHandler = async (id: string) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const updatedHandler = async (id: string) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/all`, { withCredentials: true })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/auth"} />;
  const filteredTasks = tasks
  .slice()
  .reverse()
  .filter((task) => {
    if (value === "All") return true; // Show all tasks
    if (value === "Completed") return task.isCompleted === true; // Show only completed tasks
    if (value === "InCompleted") return task.isCompleted === false; // Show only incomplete tasks
    return true; // Default case (fallback)
  });
  return (
    <div className="w-screen h-[93vh] fixed flex flex-col md:flex-row justify-between p-4 gap-4 overflow-hidden ">
      {/* Left Section: Create Task */}
      <div className="flex flex-col justify-start border border-primary w-full md:w-[40vw] h-[30vh] p-4 gap-4 ">
        <h2 className="text-lg font-bold">Create Task</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle((e.target as HTMLInputElement).value || "")
            }
          />
          <Input
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription((e.target as HTMLInputElement).value || "")
            }
          />
          <Button type="submit">Add Task</Button>
        </form>
      </div>

      {/* Right Section: Your Task */}
      <div className="flex flex-col justify-start  border border-primary w-full md:w-[40vw] h-[88vh] p-4 gap-2 overflow-auto">
        <h2 className="text-lg font-bold text-center">Your Task</h2>
        <div className="flex flex-row justify-start">
          <ToggleGroup
            type="single"
            value={value}
            onValueChange={(newValue) => {
              if (newValue) setValue(newValue); // Update state only if value is not null
            }}
          >
            <ToggleGroupItem value="All" aria-label="Toggle All">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="Completed" aria-label="Toggle Completed">
              Completed
            </ToggleGroupItem>
            <ToggleGroupItem value="InCompleted" aria-label="Toggle Incomplete">
              InCompleted
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col gap-2 overflow-auto scrollbar-hide">
        {filteredTasks.length > 0 ? (
      filteredTasks.map((task) => (
        <TaskList
          task={task}
          key={task._id}
          id={task._id}
          deleteHandler={deleteHandler}
          updateHandler={updatedHandler}
        />
      ))
    ) : (
      <div className="text-center text-gray-500 mt-4">
        {value === "All" && "No tasks available."}
        {value === "Completed" && "No completed tasks available."}
        {value === "InCompleted" && "No incomplete tasks available."}
      </div>
    )}
        </div>
      </div>
    </div>
  );
};

export default Home;
