import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router";
import { ListTodo, Pickaxe, SquareCheckBig } from "lucide-react";
import AddATask from "./components/Add-A-Task/AddATask";
import AxiosPublic from "../../hooks/Axios/AxiosPublic";
import Column from "./components/column/Column";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const Axios = AxiosPublic();

  useEffect(() => {
    Axios.get(`/tasks?email=${user?.email}`).then((res) => {
      setTasks(res.data);
      const todo = res.data.filter((task) => task.category === "To-Do");
      const inProgress = res.data.filter(
        (task) => task.category === "In Progress"
      );
      const done = res.data.filter((task) => task.category === "Done");
      setTodo(todo);
      setInProgress(inProgress);
      setDone(done);
    });
  }, [user, refresh]);

  const onDrop = (title, index) => {
    console.log(
      ` ${activeTask} is going to place into ${title} at position ${index}`
    );

    if (activeTask === null || activeTask === undefined) return;

    const task = tasks[activeTask];
    console.log(task);
    task.category = title;
    const newTasks = [...tasks];
    newTasks.splice(activeTask, 1);
    newTasks.splice(index, 0, task);
    setTasks(newTasks);
    const todo = newTasks.filter((task) => task.category === "To-Do");
    const inProgress = newTasks.filter(
      (task) => task.category === "In Progress"
    );
    const done = newTasks.filter((task) => task.category === "Done");
    setTodo(todo);
    setInProgress(inProgress);
    setDone(done);
    setActiveTask(null);

    const updatedTask = {
      ...task,
      category: title,
    };

    Axios.put(`/tasks/${task._id}`, updatedTask);
  };

  const updateTask = (taskId, task) => {
    console.log(taskId, task);

    Axios.put(`/tasks/${taskId}`, task)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Task updated successfully");
          setRefresh((prev) => !prev);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const deleteTask = (taskId) => {
    Axios.delete(`/tasks/${taskId}`).then(() => {
      toast.success("Task deleted successfully");
      setRefresh((prev) => !prev);
    });
  };

  return (
    <>
      {user ? (
        <section className="max-w-screen-xl mx-auto px-5 min-h-screen">
          <div className="flex items-center gap-6 justify-end py-5">
            <h1 className="text-base-content">
              Welcome, <span className="font-semibold">{user.displayName}</span>
            </h1>
            <button className="px-5 py-1 bg-rose-600 text-white rounded-lg font-medium cursor-pointer hover:opacity-80">
              Log Out
            </button>
          </div>
          <div className="flex justify-end mt-12">
            <AddATask setRefresh={setRefresh} />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* todo */}
            <Column
              title="To-Do"
              icon={<ListTodo className="w-5 h-5" />}
              task={todo}
              setActiveTask={setActiveTask}
              onDrop={onDrop}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
            {/* in progress */}
            <Column
              title="In Progress"
              icon={<Pickaxe className="w-5 h-5" />}
              task={inProgress}
              setActiveTask={setActiveTask}
              onDrop={onDrop}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
            {/* done */}
            <Column
              title="Done"
              icon={<SquareCheckBig className="w-5 h-5" />}
              task={done}
              setActiveTask={setActiveTask}
              onDrop={onDrop}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
        </section>
      ) : (
        <h1>
          Please <Link to="/">sign in</Link>
        </h1>
      )}
    </>
  );
}
