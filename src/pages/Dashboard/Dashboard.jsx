import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router";
import { ListTodo, Pickaxe, SquareCheckBig } from "lucide-react";
import AddATask from "./components/Add-A-Task/AddATask";
import AxiosPublic from "../../hooks/Axios/AxiosPublic";
import Column from "./components/column/Column";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const Axios = AxiosPublic();

  useEffect(() => {
    Axios.get("/tasks").then((res) => {
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
  }, []);

  const onDrop = (title, index) => {
    console.log(
      ` ${activeTask} is going to place into ${title} at position ${index}`
    );

    if (activeTask === null) return;

    const task = tasks[activeTask];
    console.log(task._id);
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
            <AddATask />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* todo */}
            <Column
              title="To-Do"
              icon={<ListTodo className="w-5 h-5" />}
              task={todo}
              setActiveTask={setActiveTask}
              onDrop={onDrop}
            />
            {/* in progress */}
            <Column
              title="In Progress"
              icon={<Pickaxe className="w-5 h-5" />}
              task={inProgress}
              setActiveTask={setActiveTask}
              onDrop={onDrop}
            />
            {/* done */}
            <Column
              title="Done"
              icon={<SquareCheckBig className="w-5 h-5" />}
              task={done}
              setActiveTask={setActiveTask}
              onDrop={onDrop}
            />
          </div>
          <h1>Active Card : {activeTask}</h1>
        </section>
      ) : (
        <h1>
          Please <Link to="/">sign in</Link>
        </h1>
      )}
    </>
  );
}
