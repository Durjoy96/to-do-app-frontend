import TaskCard from "../task-card/TaskCard";

const Column = ({ title, icon, task, setActiveTask, onDrop, updateTask, deleteTask }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium text-base-content-secondary flex items-center gap-2">
          {icon} {title}
        </h3>
        <div className="bg-base-100 min-h-96 shadow-sm rounded-lg p-6 mt-2">
          <TaskCard
            task={task}
            setActiveTask={setActiveTask}
            onDrop={onDrop}
            title={title}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </>
  );
};

export default Column;
